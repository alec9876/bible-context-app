using System;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Domain.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class BooksRepository : IBooksRepository
{
    private readonly AppDbContext _context;

    public BooksRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Books>> GetAllBooksAsync()
    {
        return await _context.Books.OrderBy(v => v.Order).ToListAsync();
    }

    public async Task<Books?> GetBookAllChaptersAsync(string abbrv)
    {
        return await _context.Books
                .Where(v => v.Abbreviation == abbrv)
                .Select(v => new Books
                {
                    ChapterLength = v.ChapterLength
                })
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException($"Book '{abbrv}' was not found.");
    }

    public async Task<IEnumerable<Sections>> GetBookAllSectionsAsync(string bookName)
    {
        return await _context.Sections
                .Where(v => v.BookName == bookName)
                .ToListAsync();
    }

    public async Task<Sections?> GetBookSectionAsync(string id)
    {
        return await _context.Sections
                .Where(v => v.SectionId == id)
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException($"Section {id} was not found");
    }
}
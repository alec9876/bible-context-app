using System;
using Application.DTOs;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IBooksRepository
{
    Task<IEnumerable<Books>> GetAllBooksAsync();
    Task<Books?> GetBookAllChaptersAsync(string abbrv);
    Task<IEnumerable<Sections>> GetBookAllSectionsAsync(string bookName);
    Task<Sections?> GetBookSectionAsync(string id);
}

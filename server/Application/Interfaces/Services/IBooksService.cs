using System;
using Application.DTOs;

namespace Application.Interfaces.Services;

public interface IBooksService
{
    Task<IEnumerable<BooksDTO>> GetAllBooksAsync();
    Task<BooksDTO?> GetBookAllChaptersAsync(string abbrv);
    Task<IEnumerable<SectionsDTO>> GetBookAllSectionsAsync(string bookName);
    Task<SectionsDTO?> GetBookSectionAsync(string id);
}

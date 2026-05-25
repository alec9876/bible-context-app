using System;
using Application.DTOs;

namespace Application.Interfaces.Repositories;

public interface IScriptureRepository
{
    Task<ScriptureVerseDTO?> GetChapterAsync(string bookName, string chapter);
    Task<ScriptureVerseDTO?> GetVerseAsync(string book, string verse);
}

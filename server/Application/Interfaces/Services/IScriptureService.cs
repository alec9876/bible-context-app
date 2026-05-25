using System;
using Application.DTOs;
using Domain.Entities;

namespace Application.Interfaces.Services;

public interface IScriptureService
{
    Task<ScriptureVerseDTO?> GetChapterAsync(string bookName, string chapter);
    Task<ScriptureVerseDTO?> GetVerseAsync(string book, string verse);
}

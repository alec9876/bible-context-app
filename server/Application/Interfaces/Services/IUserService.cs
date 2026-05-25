using System;
using Application.DTOs;
using Domain.Entities;

namespace Application.Interfaces.Services;

public interface IUserService
{
    Task<UsersDTO?> GetUserAsync(string email);

    Task CreateUserAsync(CreateUserDTO user);

    Task UpdateUser(string email, UpdateUserDTO user);
    Task UpdateHighlights(string email, UpdateHighlightsDTO user);

    Task DeleteUser(string email);
}

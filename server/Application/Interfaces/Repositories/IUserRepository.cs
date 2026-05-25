using System;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IUserRepository
{
    Task<Users?> GetUserAsync(string email);
    Task<bool> ExistsAsync(string email);

    Task AddUserAsync(Users user);

    Task UpdateUserAsync(Users user);

    Task DeleteUserAsync(string email);

    Task SaveChangesAsync();
}

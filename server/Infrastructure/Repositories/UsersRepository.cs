using System;
using Application.DTOs;
using Application.Interfaces;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Domain.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class UsersRepository : IUserRepository
{
    public readonly AppDbContext _context;

    public UsersRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddUserAsync(Users user)
    {
        await _context.AddAsync(user);
    }

    public async Task DeleteUserAsync(string email)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(v => v.Email == email)
            ?? throw new NotFoundException($"User {email} not found for deletion");

        _context.Users.Remove(user);
    }

    public async Task<bool> ExistsAsync(string email)
    {
        var exists = await _context.Users.AnyAsync(v => v.Email == email);
        return exists;
    }

    public async Task<Users?> GetUserAsync(string email)
    {
        return await _context.Users
                .Where(v => v.Email == email)
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException($"User {email} was not found");
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task UpdateUserAsync(Users user)
    {
         _context.Users.Update(user);
    }
}
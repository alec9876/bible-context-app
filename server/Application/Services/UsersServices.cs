using System;
using Application.DTOs;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Exceptions;

namespace Application.Services;

public class UsersServices : IUserService
{
    public readonly IUserRepository _userRepo;

    public UsersServices(IUserRepository userRepo)
    {
        _userRepo = userRepo;
    }

    public async Task CreateUserAsync(CreateUserDTO request)
    {
        if (await _userRepo.ExistsAsync(request.Email))
            throw new ValidationException($"Email {request.Email} already exists");

        var user = new Users
        {
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            ImageID = request.ImageID
        };

        await _userRepo.AddUserAsync(user);
        await _userRepo.SaveChangesAsync();
    }

    public async Task DeleteUser(string email)
    {
       await _userRepo.DeleteUserAsync(email);
       await _userRepo.SaveChangesAsync();
    }

    public async Task<UsersDTO?> GetUserAsync(string email)
    {
        var user = await _userRepo.GetUserAsync(email)
            ?? throw new NotFoundException($"User with {email} was not found.");
        
        return new UsersDTO
        {
            Email = user.Email, 
            FirstName = user.FirstName, 
            LastName = user.LastName, 
            ImageID = user.ImageID, 
            Highlights = user.Highlights
        };
    }

    public async Task UpdateHighlights(string email, UpdateHighlightsDTO request)
    {
        var user = await _userRepo.GetUserAsync(email)
            ?? throw new NotFoundException($"User {email} was not found for updating.");

        if (request.Highlights is not null) user.Highlights = request.Highlights;

        await _userRepo.UpdateUserAsync(user);
        await _userRepo.SaveChangesAsync();
    }

    public async Task UpdateUser(string email, UpdateUserDTO request)
    {
        var user = await _userRepo.GetUserAsync(email)
            ?? throw new NotFoundException($"User {email} was not found for updating.");

        if (request.FirstName is not null) user.FirstName = request.FirstName;
        if (request.LastName is not null) user.LastName = request.LastName;
        if (request.ImageID is not null) user.ImageID = request.ImageID;

        await _userRepo.UpdateUserAsync(user);
        await _userRepo.SaveChangesAsync();
    }
}
using System;

namespace Application.DTOs;

public record UsersDTO
{
    public string Email { get; init; } = string.Empty;
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string[] Highlights { get; init; } = [];
    public string ImageID { get; init; } = string.Empty;
}

public record UpdateUserDTO
{
    
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string ImageID { get; init; } = string.Empty;
}

public record CreateUserDTO
{
    
    public required string Email { get; init; } = string.Empty;
    public required string FirstName { get; init; } = string.Empty;
    public required string LastName { get; init; } = string.Empty;
    public string ImageID { get; init; } = string.Empty;
}

public record UpdateHighlightsDTO
{
    public string[] Highlights { get; init; } = [];
}


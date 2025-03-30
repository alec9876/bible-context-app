using System;

namespace Domain.Entities;

public class Users
{
    public required string Email { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string[] Highlights { get; set; }
    public required string ImageID { get; set; }
}

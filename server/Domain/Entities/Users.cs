using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("users")]
public class Users
{
    [Key]
    [Column("email")]
    public required string Email { get; set; }
    [Column("first_name")]
    public required string FirstName { get; set; }
    [Column("last_name")]
    public required string LastName { get; set; }
    [Column("highlights")]
    public string[] Highlights { get; set; } = [];
    [Column("image_id")]
    public required string ImageID { get; set; }
}

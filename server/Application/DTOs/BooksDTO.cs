using System;

namespace Application.DTOs;

public class BooksDTO
{
    public required string Abbreviation { get; set; }
    public required string BackgroundColor { get; set; }
    public required string BookName { get; set; }
    public required string Genre { get; set; }

    public required string Id { get; set; }
    public required int Order { get; set; }
}

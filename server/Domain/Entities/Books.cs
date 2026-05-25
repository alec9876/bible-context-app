using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("books")]
public class Books
{
    [Key]
    [Column("abbreviation")]
    public string? Abbreviation { get; set; }
    [Column("background_color")]
    public string? BackgroundColor { get; set; }
    [Column("book_name")]
    public string? BookName { get; set; }
    [Column("genre")]
    public string? Genre { get; set; }
    [Column("order")]
    public int Order { get; set; }
    [Column("chapter_length")]
    public int ChapterLength { get; set; }

    public Books(string abbreviation, string backgroundColor, string bookName, string genre, string id, int order, int chapterLength)
    {
        Abbreviation = abbreviation;
        BackgroundColor = backgroundColor;
        BookName = bookName;
        Genre = genre;
        Order = order;
        ChapterLength = chapterLength;
    }
    
    public Books(){}
}

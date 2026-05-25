using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("sections")]
public class Sections
{
    [Key]
    [Column("id")]
    public string? SectionId {get; set;}
    [Column("background_color")]
    public string? BackgroundColor { get; set; }
    [Column("book_name")]
    public string? BookName { get; set; }
    [Column("title")]
    public string? Title { get; set; }
    [Column("order")]
    public int Order { get; set; }
    [Column("length")]
    public int Length { get; set; }
    [Column("verses")]
    public string? Verses { get; set; }

    public Sections(string backgroundColor, string bookName, string title, int order, int length, string verses)
    {
        BackgroundColor = backgroundColor;
        BookName = bookName;
        Title = title;
        Order = order;
        Length = length;
        Verses = verses;
    }
    
    public Sections(){}
}

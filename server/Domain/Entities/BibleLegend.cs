using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("bible_legend")]
public class BibleLegend
{
    [Column("color")]
    public string? Color { get; set; }
    [Column("description")]
    public string? Description { get; set; }
    [Column("genre")]
    public string? Genre { get; set; }
    [Column("order")]
    public int Order { get; set; }
    [Column("testament")]
    public string? Testament { get; set; }
}

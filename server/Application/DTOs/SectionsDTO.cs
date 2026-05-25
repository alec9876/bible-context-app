using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Application.DTOs;

public class SectionsDTO
{
    public required string SectionId {get; set;}
    public required string BackgroundColor { get; set; }
    public required string BookName { get; set; }
    public required string Title { get; set; }
    public required int Order { get; set; }
    public required int Length { get; set; }
    public required string Verses { get; set; }
}

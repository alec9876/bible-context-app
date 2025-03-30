using System;
using Google.Cloud.Firestore;

namespace Domain.Entities;

public class NTBooks
{
    public required string Abbreviation { get; set; }
    public required string BackgroundColor { get; set; }
    public required string BookName { get; set; }
    public required string Genre { get; set; }
    public required int Order { get; set; }
}

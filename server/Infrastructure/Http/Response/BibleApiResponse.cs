using System;

namespace Infrastructure.Http.Response;

public class BibleApiResponse
{
    public string Query { get; set; } = string.Empty;
    public string Canonical { get; set; } = string.Empty;
    public List<List<int>> Parsed { get; set; } = [];
    //public List<PassageMetum> passage_meta { get; set; }
    public string Passages { get; set; } = string.Empty;
}
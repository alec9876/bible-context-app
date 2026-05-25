using System;
using System.Data.SqlTypes;

namespace Application.DTOs;

public class ScriptureVerseDTO(string passages)
{
    public string Passages { get; set; } = passages;
}

using System;

namespace Application.Settings;

public class ScriptureAPISettings
{
    public string ApiKey { get; set; } = string.Empty;
    public string QueryBuilder { get; set; } = string.Empty;
    public string TextBuilder { get; set; } = string.Empty;
    public string HtmlVerse { get; set; } = string.Empty;
    public string TextVerse { get; set; } = string.Empty;
    public int TimeoutSeconds { get; set; }
}

using System.Net.Http.Json;
using Application.Settings;
using Microsoft.Extensions.Options;
using Application.DTOs;
using System.Net.Http.Headers;
using Infrastructure.Http.Response;

namespace Infrastructure.Http
{
    public class ScriptureApiClient
    {
        private readonly HttpClient _httpClient;
        private readonly ScriptureAPISettings _settings;

        public ScriptureApiClient(HttpClient httpClient, IOptions<ScriptureAPISettings> options)
        {
            _settings = options.Value;
            _httpClient = httpClient;

            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _settings.ApiKey);
        }

        public async Task<ScriptureVerseDTO> GetChapterAsync(string book, string chapter)
        {
            var response = await _httpClient.GetAsync($"{_settings.QueryBuilder}{book}+{chapter}{_settings.HtmlVerse}");
            response.EnsureSuccessStatusCode();

            var apiResponse = await response.Content.ReadFromJsonAsync<BibleApiResponse>() ?? throw new InvalidOperationException("Api returned an empty response");
            return new ScriptureVerseDTO(apiResponse.Passages);
        }

        public async Task<ScriptureVerseDTO> GetVerseAsync(string book, string verse)
        {
            var response = await _httpClient.GetAsync($"{_settings.TextBuilder}{book}+{verse}{_settings.TextVerse}");
            response.EnsureSuccessStatusCode();

            var apiResponse = await response.Content.ReadFromJsonAsync<BibleApiResponse>() ?? throw new InvalidOperationException("Api returned an empty response");
            return new ScriptureVerseDTO(apiResponse.Passages);
        }
    }
}
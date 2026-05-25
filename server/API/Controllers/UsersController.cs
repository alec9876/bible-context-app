using System;
using Application.DTOs;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _service;

    public UsersController(IUserService service)
    {
        _service = service;
    }

    [HttpGet("{email}")]
    public async Task<IActionResult> GetUser(string email)
    {
        var user = await _service.GetUserAsync(email);
        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateUserDTO request)
    {
        await _service.CreateUserAsync(request);
        return Created();
    }

    [HttpPatch("{email}/highlights")]
    public async Task<IActionResult> UpdateHighlights(string email, UpdateHighlightsDTO highlights)
    {
        await _service.UpdateHighlights(email, highlights);
        return NoContent();
    }

    [HttpPatch("{email}/updateUser")]
    public async Task<IActionResult> UpdateUserInfo(string email, UpdateUserDTO request)
    {
        await _service.UpdateUser(email, request);
        return NoContent();
    }

}
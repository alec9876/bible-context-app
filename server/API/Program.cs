using System;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Application.Settings;
using Scalar.AspNetCore;
using API.Middleware;
using Application.Interfaces.Services;
using Application.Services;
using Application.Interfaces.Repositories;
using Infrastructure.Repositories;
using DotNetEnv;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ScriptureAPISettings>(
    builder.Configuration.GetSection("BibleApi"));

builder.Services.AddScoped<IUserService, UsersServices>();
builder.Services.AddScoped<IUserRepository, UsersRepository>();
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(); //UI at /scalar/v1
}

app.UseMiddleware<ExceptionMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;
[Table("doctrine")]
public class Doctrine
{
    [Column("subject")]
    public string? Subject {get; set;}
    [Column("order")]
    public int Order { get; set; }
    [Column("topic")]
    public string? Topic { get; set; }
    [Column("verses")]
    public string[]? Verses { get; set; }
    [Column("sub_topic")]
    public string? SubTopic { get; set; }
}
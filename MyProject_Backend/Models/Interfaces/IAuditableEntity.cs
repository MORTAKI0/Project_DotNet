namespace MyProject_Backend.Models.Interfaces
{
    public interface IAuditableEntity
    {
        string CreatedBy { get; set; }
        DateTime CreatedAt { get; set; }
        string LastModifiedBy { get; set; }
        DateTime? LastModifiedAt { get; set; }
    }
}
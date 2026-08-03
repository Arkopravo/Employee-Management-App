using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Employee.api.Model
{
    [Table("employeeTbl")]
    public class EmployeeModel
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int employeeId { get; set; }
        [Required,MaxLength(50)]
        public string name { get; set; } = string.Empty;
        [Required, MaxLength(10), MinLength(10)]
        public string contactNo { get; set; }
        [Required, MaxLength(50)]
        [EmailAddress]
        public string email { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        public string state { get; set; } = string.Empty;
        [Required, MaxLength(6)]
        public string pincode { get; set; } = string.Empty;
        [MaxLength(10), MinLength(10)]
        public string? altContactNo { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        public string address { get; set; } = string.Empty;
        public int designationId { get; set; }
        public DateTime? createdDate { get; set; }
        public DateTime? modifiedDate { get; set; }
        public string? role { get; set; } = string.Empty;
    }
        
    public class LoginModel
    {
        [Required]
        [EmailAddress]
        public string email { get; set; } = string.Empty;

        [Required]
        public string contactNo { get; set; } = string.Empty;
    }
}

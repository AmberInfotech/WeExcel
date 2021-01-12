using System;
using System.ComponentModel.DataAnnotations;

namespace WeExcel.DAL.Models
{
    public class Employee : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [MaxLength(50)]
        public string LastName { get; set; }

        public DateTime HireDate { get; set; }
        
        [Required]
        public bool IsActive { get; set; }
    }
}

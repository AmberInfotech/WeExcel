using System;
using System.ComponentModel.DataAnnotations;

namespace WeExcel.DAL.Models
{
    public class Employee : BaseEntity
    {
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [MaxLength(50)]
        public string LastName { get; set; }

        public DateTime HireDate { get; set; }

        [MaxLength(150)]
        public string Email { get; set; }
        public int Age { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int PictureId { get; set; }
    }
}

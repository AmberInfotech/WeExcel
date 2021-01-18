﻿using System;
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

        public string Email { get; set; }

        public int Age { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int PictureId { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }
}

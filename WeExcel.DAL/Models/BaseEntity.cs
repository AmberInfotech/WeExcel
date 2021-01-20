using System;
using System.ComponentModel.DataAnnotations;

namespace WeExcel.DAL.Models
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string CreatedBy { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}

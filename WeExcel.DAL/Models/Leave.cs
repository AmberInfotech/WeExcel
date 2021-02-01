using System;
using System.ComponentModel.DataAnnotations;

namespace WeExcel.DAL.Models
{
    public class Leave : BaseEntity
    {
        [Required]
        public int LeaveTypeId { get; set; }

        [Required]
        public int EmpId { get; set; }

        [Required]
        public DateTime FromDate { get; set; }

        [Required]
        public DateTime ToDate { get; set; }

        [Required, MaxLength(250)]
        public string Reason { get; set; }
    }
}

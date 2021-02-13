using System;
using System.ComponentModel.DataAnnotations;

namespace WeExcel.BAL.Dtos
{
    public class LeaveDtos
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

    public class LeaveListDto: LeaveDtos
    {
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string LeaveTypeName { get; set; }
    }
}

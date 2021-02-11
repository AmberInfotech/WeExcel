using System.ComponentModel.DataAnnotations;

namespace WeExcel.DAL.Models
{
    public class LeaveType
    {
        [Key]
        public int ID { get; set; }

        [Required, MaxLength(20)]
        public string LeaveTypeName { get; set; }
    }
}

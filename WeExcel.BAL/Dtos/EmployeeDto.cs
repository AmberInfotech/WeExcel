using System;

namespace WeExcel.BAL.Dtos
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime HireDate { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int PictureId { get; set; }
    }
}

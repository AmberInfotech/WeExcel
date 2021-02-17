using Microsoft.AspNetCore.Identity;

namespace WeExcel.DAL.Models
{
    public class AppRole: IdentityRole
    {
        public bool IsEnabled { get; set; }
    }
}

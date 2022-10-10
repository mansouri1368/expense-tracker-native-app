using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public ICollection<Expense> Expenses { get; set; }
    }
}
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            var users = new List<AppUser>
            {
                new AppUser
                {
                    UserName = "bob",
                    Email = "bob@test.com"
                },
                new AppUser
                {
                    UserName = "jane",
                    Email = "jane@test.com"
                },
                new AppUser
                {
                    UserName = "tom",
                    Email = "tom@test.com"
                },
            };

            if (!userManager.Users.Any())
            {
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Expenses.Any()) return;

            var expenses = new List<Expense> {
                new Expense {
                    Cost = 15000,
                    Date = DateTime.Now.AddDays(-3).AddHours(5),
                    Description="Buy some apples",
                    User = users[0]
                }, new Expense {
                    Cost = 20000,
                    Date = DateTime.Now.AddDays(-8).AddHours(-6),
                    Description="Buy some milk",
                    User = users[1]
                }, new Expense {
                    Cost = 500000,
                    Date = DateTime.Now.AddDays(-2).AddHours(-2),
                    Description="Buy sunglasses",
                    User = users[1]
                }, new Expense {
                    Cost = 60000,
                    Date = DateTime.Now.AddDays(-10).AddHours(-1),
                    Description="Pay internet bill",
                    User = users[2]
                }, new Expense {
                    Cost = 1500000,
                    Date = DateTime.Now.AddDays(-5).AddHours(10),
                    Description="Pay University tuition fees",
                    User = users[0]
                }
            };

            await context.Expenses.AddRangeAsync(expenses);
            await context.SaveChangesAsync();
        }
    }
}
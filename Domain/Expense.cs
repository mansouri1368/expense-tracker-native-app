using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Expense
    {
        public Guid Id { get; set; }
        [Required]
        public int Cost { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public AppUser User { get; set; }
    }
}
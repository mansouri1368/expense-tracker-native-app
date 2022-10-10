namespace Application
{
    public class ExpenseDto
    {
        public Guid Id { get; set; }
        public int Cost { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
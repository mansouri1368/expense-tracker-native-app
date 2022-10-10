using Domain;
using FluentValidation;

namespace Application.Expenses
{
    public class ExpenseValidator : AbstractValidator<Expense>
    {
        public ExpenseValidator()
        {
            RuleFor(e => e.Cost).NotEmpty();
            RuleFor(e => e.Date).NotEmpty();
            RuleFor(e => e.Description).NotEmpty();
        }
    }
}
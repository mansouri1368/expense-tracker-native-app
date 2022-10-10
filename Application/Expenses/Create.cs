using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Expenses
{
    public class Create
    {
        public class Query : IRequest<Result<Guid>>
        {
            public Expense Expense { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Expense).SetValidator(new ExpenseValidator());
            }
        }

        public class Handler : IRequestHandler<Query, Result<Guid>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Guid>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(user => user.UserName == _userAccessor.GetUsername());
                
                request.Expense.User = user;

                _context.Expenses.Add(request.Expense);
                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Result<Guid>.Success(request.Expense.Id);

                return Result<Guid>.Failure("Problem with creating expense.");
            }
        }
    }
}
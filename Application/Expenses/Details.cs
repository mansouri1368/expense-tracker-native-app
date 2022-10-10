using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Expenses
{
    public class Details
    {
        public class Query : IRequest<Result<Expense>> 
        {
            public Guid Id {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<Expense>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Expense>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(user => user.UserName == _userAccessor.GetUsername());

                if(user == null) return null;

                var expense = await _context.Expenses.FirstOrDefaultAsync(expense => expense.Id == request.Id && expense.User.Id == user.Id);

                if(expense == null) return null;
                
                return Result<Expense>.Success(expense);
            }
        }
    }
}
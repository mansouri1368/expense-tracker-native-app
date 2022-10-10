using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Expenses
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Expense Expense { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
            _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(user => user.UserName == _userAccessor.GetUsername());

                if(user == null) return null;

                var expense = await _context.Expenses.FirstOrDefaultAsync(expense => expense.Id == request.Expense.Id && expense.User.Id == user.Id);

                if(expense == null) return null;
                
                _mapper.Map(request.Expense, expense);
                
                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem with editing expense.");
            }
        }
    }
}
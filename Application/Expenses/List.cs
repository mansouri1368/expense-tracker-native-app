using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Expenses
{
    public class List
    {
        public class Query : IRequest<Result<List<ExpenseDto>>>
        {            
        }

        public class Handler : IRequestHandler<Query, Result<List<ExpenseDto>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ExpenseDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(user => user.UserName == _userAccessor.GetUsername());

                if(user == null) return null;

                var expenses = await _context.Expenses.Where(expense => expense.User.Id == user.Id).ToListAsync();                
                
                var expenseDtos = _mapper.Map<List<ExpenseDto>>(expenses);

                return Result<List<ExpenseDto>>.Success(expenseDtos);
            }
        }
    }
}
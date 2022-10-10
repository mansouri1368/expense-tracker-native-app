using Application.Expenses;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ExpensesController : BaseAPIController
    {
        [HttpGet]
        public async Task<IActionResult> GetExpenses()
        {
            return HandleResult(await Mediator.Send(new List.Query())); 
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(Guid id) 
        {
            return HandleResult(await Mediator.Send(new Details.Query {Id=id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateExpense(Expense expense)
        {
            expense.Id = Guid.NewGuid();
            return HandleResult((await Mediator.Send(new Create.Query {Expense = expense})));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditExpense(Guid id, Expense expense)
        {
            expense.Id = id;
            return HandleResult((await Mediator.Send(new Edit.Command {Expense = expense})));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(Guid id)
        {
            return HandleResult((await Mediator.Send(new Delete.Command {Id = id})));
        }
    }
}
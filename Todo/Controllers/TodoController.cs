using Microsoft.AspNetCore.Mvc;
using Todo.Models;
using Todo.Repository;
using Todo.RequestHelpers;

namespace Todo.Controllers
{
    [Route("api/todos")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;

        public TodoController(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        // GET: api/todo
        [HttpGet]
        public async Task<ActionResult<PaginatedResponse<TodoItem>>> GetTodos([FromQuery] TaskQueryParameters queryParameters)
        {
            var (todos, count) = await _todoRepository.GetTasksAsync(queryParameters);
            var paginatedResponse = new PaginatedResponse<TodoItem>(todos, count, queryParameters.PageNumber, queryParameters.PageSize);

            return Ok(paginatedResponse);
        }

        // GET: api/todo/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodo(int id)
        {
            var todo = await _todoRepository.GetTaskByIdAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            return Ok(todo);
        }

        // POST: api/todo
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodo([FromBody] TodoItem todo)
        {
            await _todoRepository.AddTaskAsync(todo);
            return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
        }

        // PUT: api/todo/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] TodoItem updatedTodo)
        {
            if (id != updatedTodo.Id)
            {
                return BadRequest();
            }

            var existingTodo = await _todoRepository.GetTaskByIdAsync(id);
            if (existingTodo == null)
            {
                return NotFound();
            }

            updatedTodo.Name = updatedTodo.Name ?? existingTodo.Name;

            // Manually check and update the properties
            Type todoType = typeof(TodoItem);
            foreach (var property in todoType.GetProperties())
            {
                var updatedValue = property.GetValue(updatedTodo);
                if (updatedValue != null && property.Name != nameof(TodoItem.Id)) // Avoid updating the Id
                {
                    property.SetValue(existingTodo, updatedValue);
                }
            }

            await _todoRepository.UpdateTaskAsync(existingTodo);
            return NoContent();
        }


        // DELETE: api/todo/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var existingTodo = await _todoRepository.GetTaskByIdAsync(id);
            if (existingTodo == null)
            {
                return NotFound();
            }

            await _todoRepository.DeleteTaskAsync(id);
            return NoContent();
        }
    }
}

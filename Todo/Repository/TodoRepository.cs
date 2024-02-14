using Microsoft.EntityFrameworkCore;
using Todo.Data;
using Todo.Models;
using Todo.RequestHelpers;

namespace Todo.Repository
{
    public class TodoRepository: ITodoRepository
    {
        private readonly ToDoDbContext _context;

        public TodoRepository(ToDoDbContext context)
        {
            _context = context;
        }

        public async Task<(IEnumerable<TodoItem>, int)> GetTasksAsync(TaskQueryParameters queryParameters)
        {
            IQueryable<TodoItem> query = _context.TodoItems;

            // Apply filtering
            if (!string.IsNullOrEmpty(queryParameters.SearchTerm))
            {
                query = query.Where(t => t.Name.ToLower().Contains(queryParameters.SearchTerm));
            }


            int count = await query.CountAsync();

            // Apply pagination
            query = query.Skip((queryParameters.PageNumber - 1) * queryParameters.PageSize)
                         .Take(queryParameters.PageSize);

            var data = await query.ToListAsync();
            return (data, count);
        }

        public async Task<TodoItem> GetTaskByIdAsync(int taskId)
        {
            return await _context.TodoItems.FindAsync(taskId);
        }

        public async Task AddTaskAsync(TodoItem task)
        {
            await _context.TodoItems.AddAsync(task);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTaskAsync(TodoItem task)
        {
            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTaskAsync(int taskId)
        {
            var task = await _context.TodoItems.FindAsync(taskId);
            if (task != null)
            {
                _context.TodoItems.Remove(task);
                await _context.SaveChangesAsync();
            }
        }
    }
}

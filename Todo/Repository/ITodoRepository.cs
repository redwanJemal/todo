using Todo.Models;
using Todo.RequestHelpers;

namespace Todo.Repository
{
    public interface ITodoRepository
    {
        Task<(IEnumerable<TodoItem>, int)> GetTasksAsync(TaskQueryParameters queryParameters);
        Task<TodoItem> GetTaskByIdAsync(int taskId);
        Task AddTaskAsync(TodoItem task);
        Task UpdateTaskAsync(TodoItem task);
        Task DeleteTaskAsync(int taskId);
    }
}

using Microsoft.EntityFrameworkCore;
using Todo.Models;

namespace Todo.Data
{
    public class ToDoDbContext: DbContext
    {
        public ToDoDbContext(DbContextOptions options): base(options) 
        {
            
        }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}

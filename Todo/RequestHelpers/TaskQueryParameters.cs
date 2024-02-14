namespace Todo.RequestHelpers
{
    public class TaskQueryParameters
    {
        public string? SearchTerm { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public bool? IsCompleted { get; set; }

    }
}

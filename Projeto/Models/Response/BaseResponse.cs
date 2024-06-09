namespace Projeto.Models.Response
{
    public class BaseResponse<T> : BaseResponse
    {
        public T? Data { get; set; }


        public BaseResponse(T? data, string? message, bool success = true) : base(message, success)
        {
            Data = data;
        }

        public BaseResponse(string? message, bool success = false) : base(message, success)
        {
        }
    }

    public class BaseResponse(string? message, bool success = false)
    {
        public string? Message { get; set; } = message;
        public bool Success { get; set; } = success;
    }
}

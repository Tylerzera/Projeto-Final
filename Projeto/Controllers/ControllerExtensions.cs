using System.Security.Claims;

namespace Projeto.Controllers
{
    public static class ControllerExtensions
    {
        public static Guid GetUserId(this ClaimsPrincipal principal)
        {
            return Guid.Parse(principal.FindFirstValue(ClaimTypes.NameIdentifier) ?? Guid.Empty.ToString());
        }
    }
}

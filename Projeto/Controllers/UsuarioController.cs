using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
using Projeto.Models.Services;

namespace Projeto.Controllers
{
    [ApiController]
    [Route("usuario")]
    public class UsuarioController(IUsuarioService usuarioService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(Usuario usuario)
        {
            var response = await usuarioService.Create(usuario);
            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Usuario usuario)
        {
            var response = await usuarioService.Login(usuario);
            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpPost("trocar-senha")]
        public async Task<IActionResult> TrocarSenha(string antigaSenha, string novaSenha)
        {
            var response = await usuarioService.TrocarSenha(antigaSenha, novaSenha);
            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }
    }
}

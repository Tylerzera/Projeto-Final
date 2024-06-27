using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
using Projeto.Models.Services;

namespace Projeto.Controllers
{
    [ApiController]
    [Route("grupo")]
    [Authorize]
    public class GrupoController(IGrupoService grupoService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(Grupo grupo)
        {
            var response = await grupoService.Create(grupo, User.GetUserId());
            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("/participando")]
        public async Task<IActionResult> GetParticipando()
        {
            var grupos = await grupoService.GetParticipando(User.GetUserId());
            return Ok(grupos);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, Grupo grupo)
        {
            grupo.Id = id;
            var response = await grupoService.Update(grupo, User.GetUserId());
            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var grupos = await grupoService.GetAll(User.GetUserId());
            return Ok(grupos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var grupo = await grupoService.GetById(id, User.GetUserId());
            if (grupo == null)
                return NotFound("Grupo não encontrado.");

            return Ok(grupo);
        }

        [HttpPost("{id}/convites")]
        public async Task<IActionResult> CriarConvite(Guid id)
        {
            var response = await grupoService.CriarConvite(id, User.GetUserId());
            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpPost("convites/{codigo}/aceitar")]
        public async Task<IActionResult> AceitarConvite(int codigo)
        {
            var response = await grupoService.AceitarConvite(codigo, User.GetUserId());
            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpPost("{id}/sortear")]
        public async Task<IActionResult> Sortear(Guid id)
        {
            var response = await grupoService.Sortear(id, User.GetUserId());
            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }
    }
}

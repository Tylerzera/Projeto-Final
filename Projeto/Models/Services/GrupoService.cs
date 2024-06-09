using Microsoft.EntityFrameworkCore;
using Projeto.Database;
using Projeto.Models.Response;

namespace Projeto.Models.Services
{
    public class GrupoService(Context context) : IGrupoService
    {
        public async Task<Grupo?> GetById(Guid id, Guid userId)
        {
            return await context.Grupos
                 .Include(g => g.Participantes)
                 .Include(g => g.Dono)
                 .Include(g => g.Convites)
                 .AsNoTracking()
                 .Where(g => g.DonoId == userId)
                 .FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task<List<Grupo>> GetAll(Guid userId)
        {
            return await context.Grupos
                 .Include(g => g.Participantes)
                 .Include(g => g.Dono)
                 .AsNoTracking()
                 .Where(g => g.DonoId == userId)
                 .ToListAsync();
        }

        public async Task<BaseResponse<Grupo>> Create(Grupo grupo, Guid userId)
        {
            grupo.DonoId = userId;
            context.Grupos.Add(grupo);
            await context.SaveChangesAsync();

            return new(grupo, "Grupo cadastrado com sucesso.");
        }

        public async Task<BaseResponse> Update(Grupo grupo, Guid userId)
        {
            var grupoExistente = await GetById(grupo.Id, userId);
            if (grupoExistente == null)
                return new("Grupo não encontrado.");

            grupo.DonoId = userId;
            context.Grupos.Update(grupo);
            await context.SaveChangesAsync();

            return new("Grupo atualizado com sucesso.", true);
        }

        public async Task<BaseResponse<string>> CriarConvite(Guid grupoId, Guid usuarioId)
        {
            var grupo = await GetById(grupoId, usuarioId);
            if (grupo == null)
                return new("Grupo não encontrado.");

            var convite = new Convite
            {
                GrupoId = grupoId,
                Codigo = Random.Shared.Next(1000, 999999)
            };
            context.Convites.Add(convite);
            await context.SaveChangesAsync();

            return new("Convite enviado com sucesso.", true);
        }

        public async Task<BaseResponse> AceitarConvite(int codigo, Guid usuarioId)
        {
            var convite = await context.Convites.FirstOrDefaultAsync(c => c.Codigo == codigo);
            if (convite == null)
                return new("Convite não encontrado.");

            var usuario = await context.Usuarios.FirstOrDefaultAsync(u => u.Id == usuarioId);
            if (usuario == null)
                return new("Usuário não encontrado.");

            if (convite.Aceito)
                return new("Convite já aceito.");

            convite.Aceito = true;
            context.Convites.Update(convite);
            await context.SaveChangesAsync();

            var participante = new Participante
            {
                GrupoId = convite.GrupoId,
                UsuarioId = usuarioId
            };
            context.Participantes.Add(participante);
            await context.SaveChangesAsync();

            return new("Convite aceito com sucesso.", true);
        }
    }
}

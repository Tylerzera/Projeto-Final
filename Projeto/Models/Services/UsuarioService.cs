using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Projeto.Database;
using Projeto.Models.Response;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Projeto.Models.Services
{
    public class UsuarioService(Context context) : IUsuarioService
    {
        public async Task<Usuario?> GetById(Guid id)
        {
            return await context.Usuarios
                 .Include(u => u.Grupos)
                 .Include(u => u.GruposParticipante)
                 .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<Usuario?> GetByEmail(string email)
        {
            return await context.Usuarios
                 .Include(u => u.Grupos)
                 .Include(u => u.GruposParticipante)
                 .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<BaseResponse<Usuario>> Create(Usuario usuario)
        {
            var usuarioExistente = await GetByEmail(usuario.Email);
            if (usuarioExistente != null)
                return new("E-mail já cadastrado.");

            context.Usuarios.Add(usuario);
            await context.SaveChangesAsync();

            return new(usuario, "Usuário cadastrado com sucesso.");
        }

        public async Task<BaseResponse<string>> Login(Usuario usuarioForm)
        {
            var usuario = await GetByEmail(usuarioForm.Email);
            if (usuario == null)
                return new("Usuário não encontrado.");

            if (usuario.Senha != usuarioForm.Senha)
            {
                return new("Senha incorreta.");
            }

            var token = GerarToken(usuario);

            return new(token, "Login efetuado com sucesso.");
        }

        public async Task<BaseResponse> TrocarSenha(string antigaSenha, string novaSenha)
        {
            var usuario = await GetByEmail(antigaSenha);
            if (usuario == null)
                return new("Usuário não encontrado.");

            if (usuario.Senha != antigaSenha)
            {
                return new("Senha incorreta.");
            }

            usuario.Senha = novaSenha;
            await context.SaveChangesAsync();

            return new("Senha alterada com sucesso.");
        }

        private string GerarToken(Usuario usuario)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("6PVgMEF3On5Dhi23ayrmiH8AYjwEJ3yMoeoDX7MU1D8a7GhkOF");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    [
                        new(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                        new(ClaimTypes.Email, usuario.Email)
                    ]),
                Expires = DateTime.UtcNow.AddYears(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}

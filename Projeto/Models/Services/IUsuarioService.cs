
using Projeto.Models.Response;

namespace Projeto.Models.Services
{
    public interface IUsuarioService
    {
        Task<BaseResponse<Usuario>> Create(Usuario usuario);
        Task<Usuario?> GetByEmail(string email);
        Task<Usuario?> GetById(Guid id);
        Task<BaseResponse<string>> Login(Usuario usuarioForm);
        Task<BaseResponse> TrocarSenha(string antigaSenha, string novaSenha);
    }
}

using Projeto.Models.Response;

namespace Projeto.Models.Services
{
    public interface IGrupoService
    {
        Task<BaseResponse> AceitarConvite(int codigo, Guid usuarioId);
        Task<BaseResponse<Grupo>> Create(Grupo grupo, Guid userId);
        Task<BaseResponse<string>> CriarConvite(Guid grupoId, Guid usuarioId);
        Task<List<Grupo>> GetAll(Guid userId);
        Task<Grupo?> GetById(Guid id, Guid userId);
        Task<BaseResponse> Update(Grupo grupo, Guid userId);
    }
}
namespace Projeto.Models
{
    public class Participante
    {
        public Guid Id { get; set; }
        public Guid UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public Guid GrupoId { get; set; }
        public Grupo Grupo { get; set; }
    }
}

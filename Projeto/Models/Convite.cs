namespace Projeto.Models
{
    public class Convite
    {
        public Guid Id { get; set; }
        public int Codigo { get; set; }
        public Guid GrupoId { get; set; }
        public Grupo Grupo { get; set; }
        public bool Aceito { get; set; }
    }
}

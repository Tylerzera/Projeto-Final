namespace Projeto.Models
{
    public class Grupo
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = "";
        public string Descricao { get; set; } = "";
        public string Imagem { get; set; } = "";
        public int QuantidadeMaxima { get; set; }
        public DateTime DataRevelacao { get; set; }
        public Guid DonoId { get; set; }
        public Usuario? Dono { get; set; }
        public List<Participante> Participantes { get; set; } = [];
        public List<Convite> Convites { get; set; } = [];

    }
}

namespace Projeto.Models
{
    public class Usuario
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = "";
        public string Sobrenome { get; set; } = "";
        public string Imagem { get; set; } = "";
        public string Email { get; set; } = "";
        public string Senha { get; set; } = "";

        public List<Grupo> Grupos { get; set; } = [];
        public List<Participante> GruposParticipante { get; set; } = [];
    }
}

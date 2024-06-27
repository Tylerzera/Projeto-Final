using Microsoft.EntityFrameworkCore;
using Projeto.Models;

namespace Projeto.Database
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options) { }

        public DbSet<Grupo> Grupos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Participante> Participantes { get; set; }
        public DbSet<Convite> Convites { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("APP");

            modelBuilder.Entity<Participante>(p =>
            {
                p.ToTable("Participantes");
                p.HasKey(p => p.Id);
                p.HasOne(p => p.Usuario)
                    .WithMany(u => u.GruposParticipante)
                    .HasForeignKey(p => p.UsuarioId)
                    .OnDelete(DeleteBehavior.Restrict);

                p.HasOne(p => p.Grupo)
                    .WithMany(g => g.Participantes)
                    .HasForeignKey(p => p.GrupoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Convite>(p =>
            {
                p.ToTable("Convites");

                p.HasKey(p => p.Id);

                p.HasOne(p => p.Grupo)
                    .WithMany(g => g.Convites)
                    .HasForeignKey(p => p.GrupoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Grupo>(g =>
            {
                g.ToTable("Grupos");

                g.HasKey(g => g.Id);

                g.HasOne(g => g.Dono)
                    .WithMany(u => u.Grupos)
                    .HasForeignKey(g => g.DonoId)
                    .OnDelete(DeleteBehavior.Restrict);

                g.HasMany(g => g.Participantes)
                    .WithOne(p => p.Grupo)
                    .HasForeignKey(p => p.GrupoId)
                    .OnDelete(DeleteBehavior.Restrict);

                g.HasOne(g => g.Sorteado)
                    .WithMany(u => u.GruposVencedores)
                    .HasForeignKey(g => g.SorteadoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Usuario>(u =>
            {
                u.ToTable("Usuarios");

                u.HasKey(u => u.Id);

                u.HasMany(u => u.Grupos)
                    .WithOne(g => g.Dono)
                    .HasForeignKey(g => g.DonoId)
                    .OnDelete(DeleteBehavior.Restrict);

                u.HasMany(u => u.GruposParticipante)
                    .WithOne(p => p.Usuario)
                    .HasForeignKey(p => p.UsuarioId)
                    .OnDelete(DeleteBehavior.Restrict);

                u.HasMany(u => u.GruposVencedores)
                  .WithOne(g => g.Sorteado)
                  .HasForeignKey(g => g.SorteadoId)
                  .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}

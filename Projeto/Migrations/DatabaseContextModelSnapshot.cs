﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Projeto.Database;

#nullable disable

namespace Projeto.Migrations
{
    [DbContext(typeof(Context))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("APP")
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Projeto.Models.Convite", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Aceito")
                        .HasColumnType("bit");

                    b.Property<int>("Codigo")
                        .HasColumnType("int");

                    b.Property<Guid>("GrupoId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("GrupoId");

                    b.ToTable("Convites", "APP");
                });

            modelBuilder.Entity("Projeto.Models.Grupo", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DataRevelacao")
                        .HasColumnType("datetime2");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("DonoId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Imagem")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QuantidadeMaxima")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DonoId");

                    b.ToTable("Grupos", "APP");
                });

            modelBuilder.Entity("Projeto.Models.Participante", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("GrupoId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UsuarioId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("GrupoId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Participantes", "APP");
                });

            modelBuilder.Entity("Projeto.Models.Usuario", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Imagem")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Sobrenome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Usuarios", "APP");
                });

            modelBuilder.Entity("Projeto.Models.Convite", b =>
                {
                    b.HasOne("Projeto.Models.Grupo", "Grupo")
                        .WithMany("Convites")
                        .HasForeignKey("GrupoId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Grupo");
                });

            modelBuilder.Entity("Projeto.Models.Grupo", b =>
                {
                    b.HasOne("Projeto.Models.Usuario", "Dono")
                        .WithMany("Grupos")
                        .HasForeignKey("DonoId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Dono");
                });

            modelBuilder.Entity("Projeto.Models.Participante", b =>
                {
                    b.HasOne("Projeto.Models.Grupo", "Grupo")
                        .WithMany("Participantes")
                        .HasForeignKey("GrupoId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Projeto.Models.Usuario", "Usuario")
                        .WithMany("GruposParticipante")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Grupo");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Projeto.Models.Grupo", b =>
                {
                    b.Navigation("Convites");

                    b.Navigation("Participantes");
                });

            modelBuilder.Entity("Projeto.Models.Usuario", b =>
                {
                    b.Navigation("Grupos");

                    b.Navigation("GruposParticipante");
                });
#pragma warning restore 612, 618
        }
    }
}

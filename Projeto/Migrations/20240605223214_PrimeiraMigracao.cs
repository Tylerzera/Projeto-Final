using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Projeto.Migrations
{
    /// <inheritdoc />
    public partial class PrimeiraMigracao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "APP");

            migrationBuilder.CreateTable(
                name: "Usuarios",
                schema: "APP",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sobrenome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Imagem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Senha = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Grupos",
                schema: "APP",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Imagem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuantidadeMaxima = table.Column<int>(type: "int", nullable: false),
                    DataRevelacao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DonoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grupos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Grupos_Usuarios_DonoId",
                        column: x => x.DonoId,
                        principalSchema: "APP",
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Convites",
                schema: "APP",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Codigo = table.Column<int>(type: "int", nullable: false),
                    GrupoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Aceito = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Convites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Convites_Grupos_GrupoId",
                        column: x => x.GrupoId,
                        principalSchema: "APP",
                        principalTable: "Grupos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Participantes",
                schema: "APP",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UsuarioId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GrupoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participantes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Participantes_Grupos_GrupoId",
                        column: x => x.GrupoId,
                        principalSchema: "APP",
                        principalTable: "Grupos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Participantes_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalSchema: "APP",
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Convites_GrupoId",
                schema: "APP",
                table: "Convites",
                column: "GrupoId");

            migrationBuilder.CreateIndex(
                name: "IX_Grupos_DonoId",
                schema: "APP",
                table: "Grupos",
                column: "DonoId");

            migrationBuilder.CreateIndex(
                name: "IX_Participantes_GrupoId",
                schema: "APP",
                table: "Participantes",
                column: "GrupoId");

            migrationBuilder.CreateIndex(
                name: "IX_Participantes_UsuarioId",
                schema: "APP",
                table: "Participantes",
                column: "UsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Convites",
                schema: "APP");

            migrationBuilder.DropTable(
                name: "Participantes",
                schema: "APP");

            migrationBuilder.DropTable(
                name: "Grupos",
                schema: "APP");

            migrationBuilder.DropTable(
                name: "Usuarios",
                schema: "APP");
        }
    }
}

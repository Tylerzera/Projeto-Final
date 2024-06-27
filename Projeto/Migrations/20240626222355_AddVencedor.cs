using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Projeto.Migrations
{
    /// <inheritdoc />
    public partial class AddVencedor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SorteadoId",
                schema: "APP",
                table: "Grupos",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Grupos_SorteadoId",
                schema: "APP",
                table: "Grupos",
                column: "SorteadoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Grupos_Usuarios_SorteadoId",
                schema: "APP",
                table: "Grupos",
                column: "SorteadoId",
                principalSchema: "APP",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Grupos_Usuarios_SorteadoId",
                schema: "APP",
                table: "Grupos");

            migrationBuilder.DropIndex(
                name: "IX_Grupos_SorteadoId",
                schema: "APP",
                table: "Grupos");

            migrationBuilder.DropColumn(
                name: "SorteadoId",
                schema: "APP",
                table: "Grupos");
        }
    }
}

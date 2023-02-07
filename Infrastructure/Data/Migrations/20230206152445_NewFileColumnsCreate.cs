using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    public partial class NewFileColumnsCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TheFiles_TheImplementations_TheImplementationId",
                table: "TheFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_TheFiles_TheOutputs_TheOutputId",
                table: "TheFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_TheFiles_TheSystems_TheSystemId",
                table: "TheFiles");

            migrationBuilder.DropIndex(
                name: "IX_TheFiles_TheImplementationId",
                table: "TheFiles");

            migrationBuilder.DropIndex(
                name: "IX_TheFiles_TheOutputId",
                table: "TheFiles");

            migrationBuilder.DropIndex(
                name: "IX_TheFiles_TheSystemId",
                table: "TheFiles");

            migrationBuilder.DropColumn(
                name: "TheImplementationId",
                table: "TheFiles");

            migrationBuilder.DropColumn(
                name: "TheOutputId",
                table: "TheFiles");

            migrationBuilder.DropColumn(
                name: "TheSystemId",
                table: "TheFiles");

            migrationBuilder.AddColumn<Guid>(
                name: "TheFileId",
                table: "TheSystems",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TheFileId",
                table: "TheOutputs",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TheFileId",
                table: "TheImplementations",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "TheFiles",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_TheSystems_TheFileId",
                table: "TheSystems",
                column: "TheFileId");

            migrationBuilder.CreateIndex(
                name: "IX_TheOutputs_TheFileId",
                table: "TheOutputs",
                column: "TheFileId");

            migrationBuilder.CreateIndex(
                name: "IX_TheImplementations_TheFileId",
                table: "TheImplementations",
                column: "TheFileId");

            migrationBuilder.AddForeignKey(
                name: "FK_TheImplementations_TheFiles_TheFileId",
                table: "TheImplementations",
                column: "TheFileId",
                principalTable: "TheFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TheOutputs_TheFiles_TheFileId",
                table: "TheOutputs",
                column: "TheFileId",
                principalTable: "TheFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TheSystems_TheFiles_TheFileId",
                table: "TheSystems",
                column: "TheFileId",
                principalTable: "TheFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TheImplementations_TheFiles_TheFileId",
                table: "TheImplementations");

            migrationBuilder.DropForeignKey(
                name: "FK_TheOutputs_TheFiles_TheFileId",
                table: "TheOutputs");

            migrationBuilder.DropForeignKey(
                name: "FK_TheSystems_TheFiles_TheFileId",
                table: "TheSystems");

            migrationBuilder.DropIndex(
                name: "IX_TheSystems_TheFileId",
                table: "TheSystems");

            migrationBuilder.DropIndex(
                name: "IX_TheOutputs_TheFileId",
                table: "TheOutputs");

            migrationBuilder.DropIndex(
                name: "IX_TheImplementations_TheFileId",
                table: "TheImplementations");

            migrationBuilder.DropColumn(
                name: "TheFileId",
                table: "TheSystems");

            migrationBuilder.DropColumn(
                name: "TheFileId",
                table: "TheOutputs");

            migrationBuilder.DropColumn(
                name: "TheFileId",
                table: "TheImplementations");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "TheFiles");

            migrationBuilder.AddColumn<Guid>(
                name: "TheImplementationId",
                table: "TheFiles",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TheOutputId",
                table: "TheFiles",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TheSystemId",
                table: "TheFiles",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_TheFiles_TheImplementationId",
                table: "TheFiles",
                column: "TheImplementationId");

            migrationBuilder.CreateIndex(
                name: "IX_TheFiles_TheOutputId",
                table: "TheFiles",
                column: "TheOutputId");

            migrationBuilder.CreateIndex(
                name: "IX_TheFiles_TheSystemId",
                table: "TheFiles",
                column: "TheSystemId");

            migrationBuilder.AddForeignKey(
                name: "FK_TheFiles_TheImplementations_TheImplementationId",
                table: "TheFiles",
                column: "TheImplementationId",
                principalTable: "TheImplementations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TheFiles_TheOutputs_TheOutputId",
                table: "TheFiles",
                column: "TheOutputId",
                principalTable: "TheOutputs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TheFiles_TheSystems_TheSystemId",
                table: "TheFiles",
                column: "TheSystemId",
                principalTable: "TheSystems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

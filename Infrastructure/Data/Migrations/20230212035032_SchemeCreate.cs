using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    public partial class SchemeCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Areas_Levels_LevelId",
                table: "Areas");

            migrationBuilder.DropTable(
                name: "TheImplementations");

            migrationBuilder.DropTable(
                name: "TheOutputs");

            migrationBuilder.DropTable(
                name: "TheSystems");

            migrationBuilder.RenameColumn(
                name: "LevelId",
                table: "Areas",
                newName: "KeywordId");

            migrationBuilder.RenameIndex(
                name: "IX_Areas_LevelId",
                table: "Areas",
                newName: "IX_Areas_KeywordId");

            migrationBuilder.AddColumn<Guid>(
                name: "SchemeId",
                table: "TheFiles",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Keywords",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    KeywordName = table.Column<string>(type: "TEXT", nullable: true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LevelId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Keywords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Keywords_Levels_LevelId",
                        column: x => x.LevelId,
                        principalTable: "Levels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SysImpOutpts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    SystemName = table.Column<string>(type: "TEXT", nullable: true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ParameterId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SysImpOutpts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SysImpOutpts_Params_ParameterId",
                        column: x => x.ParameterId,
                        principalTable: "Params",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Schemes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    SchemeName = table.Column<string>(type: "TEXT", nullable: true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    SysImpOutptId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schemes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Schemes_SysImpOutpts_SysImpOutptId",
                        column: x => x.SysImpOutptId,
                        principalTable: "SysImpOutpts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TheFiles_SchemeId",
                table: "TheFiles",
                column: "SchemeId");

            migrationBuilder.CreateIndex(
                name: "IX_Keywords_LevelId",
                table: "Keywords",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Schemes_SysImpOutptId",
                table: "Schemes",
                column: "SysImpOutptId");

            migrationBuilder.CreateIndex(
                name: "IX_SysImpOutpts_ParameterId",
                table: "SysImpOutpts",
                column: "ParameterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Areas_Keywords_KeywordId",
                table: "Areas",
                column: "KeywordId",
                principalTable: "Keywords",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TheFiles_Schemes_SchemeId",
                table: "TheFiles",
                column: "SchemeId",
                principalTable: "Schemes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Areas_Keywords_KeywordId",
                table: "Areas");

            migrationBuilder.DropForeignKey(
                name: "FK_TheFiles_Schemes_SchemeId",
                table: "TheFiles");

            migrationBuilder.DropTable(
                name: "Keywords");

            migrationBuilder.DropTable(
                name: "Schemes");

            migrationBuilder.DropTable(
                name: "SysImpOutpts");

            migrationBuilder.DropIndex(
                name: "IX_TheFiles_SchemeId",
                table: "TheFiles");

            migrationBuilder.DropColumn(
                name: "SchemeId",
                table: "TheFiles");

            migrationBuilder.RenameColumn(
                name: "KeywordId",
                table: "Areas",
                newName: "LevelId");

            migrationBuilder.RenameIndex(
                name: "IX_Areas_KeywordId",
                table: "Areas",
                newName: "IX_Areas_LevelId");

            migrationBuilder.CreateTable(
                name: "TheImplementations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ParameterId = table.Column<Guid>(type: "TEXT", nullable: false),
                    TheFileId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ImpleName = table.Column<string>(type: "TEXT", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TheImplementations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TheImplementations_Params_ParameterId",
                        column: x => x.ParameterId,
                        principalTable: "Params",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TheImplementations_TheFiles_TheFileId",
                        column: x => x.TheFileId,
                        principalTable: "TheFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TheOutputs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ParameterId = table.Column<Guid>(type: "TEXT", nullable: false),
                    TheFileId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    OutputName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TheOutputs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TheOutputs_Params_ParameterId",
                        column: x => x.ParameterId,
                        principalTable: "Params",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TheOutputs_TheFiles_TheFileId",
                        column: x => x.TheFileId,
                        principalTable: "TheFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TheSystems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ParameterId = table.Column<Guid>(type: "TEXT", nullable: false),
                    TheFileId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    SystemName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TheSystems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TheSystems_Params_ParameterId",
                        column: x => x.ParameterId,
                        principalTable: "Params",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TheSystems_TheFiles_TheFileId",
                        column: x => x.TheFileId,
                        principalTable: "TheFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TheImplementations_ParameterId",
                table: "TheImplementations",
                column: "ParameterId");

            migrationBuilder.CreateIndex(
                name: "IX_TheImplementations_TheFileId",
                table: "TheImplementations",
                column: "TheFileId");

            migrationBuilder.CreateIndex(
                name: "IX_TheOutputs_ParameterId",
                table: "TheOutputs",
                column: "ParameterId");

            migrationBuilder.CreateIndex(
                name: "IX_TheOutputs_TheFileId",
                table: "TheOutputs",
                column: "TheFileId");

            migrationBuilder.CreateIndex(
                name: "IX_TheSystems_ParameterId",
                table: "TheSystems",
                column: "ParameterId");

            migrationBuilder.CreateIndex(
                name: "IX_TheSystems_TheFileId",
                table: "TheSystems",
                column: "TheFileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Areas_Levels_LevelId",
                table: "Areas",
                column: "LevelId",
                principalTable: "Levels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

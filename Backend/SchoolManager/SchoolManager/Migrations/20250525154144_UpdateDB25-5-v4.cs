using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManager.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDB255v4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Course",
                table: "Student",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SchoolYear",
                table: "Student",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "StudentCode",
                table: "Student",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "HomeroomTeacherTeacherId",
                table: "Classe",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "HomroomTeacherId",
                table: "Classe",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RoomId",
                table: "Classe",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Shift",
                table: "Classe",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Classe_HomeroomTeacherTeacherId",
                table: "Classe",
                column: "HomeroomTeacherTeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_Classe_RoomId",
                table: "Classe",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Classe_Room_RoomId",
                table: "Classe",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Classe_Teacher_HomeroomTeacherTeacherId",
                table: "Classe",
                column: "HomeroomTeacherTeacherId",
                principalTable: "Teacher",
                principalColumn: "TeacherId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classe_Room_RoomId",
                table: "Classe");

            migrationBuilder.DropForeignKey(
                name: "FK_Classe_Teacher_HomeroomTeacherTeacherId",
                table: "Classe");

            migrationBuilder.DropIndex(
                name: "IX_Classe_HomeroomTeacherTeacherId",
                table: "Classe");

            migrationBuilder.DropIndex(
                name: "IX_Classe_RoomId",
                table: "Classe");

            migrationBuilder.DropColumn(
                name: "Course",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "SchoolYear",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "StudentCode",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "HomeroomTeacherTeacherId",
                table: "Classe");

            migrationBuilder.DropColumn(
                name: "HomroomTeacherId",
                table: "Classe");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "Classe");

            migrationBuilder.DropColumn(
                name: "Shift",
                table: "Classe");
        }
    }
}

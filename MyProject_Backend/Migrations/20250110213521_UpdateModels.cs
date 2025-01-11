using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyProject_Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StockMovements_Stocks_StockId",
                table: "StockMovements");

            migrationBuilder.DropIndex(
                name: "IX_StockMovements_StockId",
                table: "StockMovements");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "Contact",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "CurrentQuantity",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "MaxThreshold",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "Reason",
                table: "StockMovements");

            migrationBuilder.DropColumn(
                name: "StockId",
                table: "StockMovements");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "StockMovements");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Clients");

            migrationBuilder.RenameColumn(
                name: "MinThreshold",
                table: "Stocks",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "MoveDate",
                table: "StockMovements",
                newName: "MovementDate");

            migrationBuilder.RenameColumn(
                name: "MovementId",
                table: "StockMovements",
                newName: "StockMovementId");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Clients",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Clients");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "Stocks",
                newName: "MinThreshold");

            migrationBuilder.RenameColumn(
                name: "MovementDate",
                table: "StockMovements",
                newName: "MoveDate");

            migrationBuilder.RenameColumn(
                name: "StockMovementId",
                table: "StockMovements",
                newName: "MovementId");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Suppliers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Contact",
                table: "Suppliers",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Suppliers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Suppliers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CurrentQuantity",
                table: "Stocks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MaxThreshold",
                table: "Stocks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Reason",
                table: "StockMovements",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StockId",
                table: "StockMovements",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "StockMovements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Clients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Clients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Clients",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Clients",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Clients",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StockMovements_StockId",
                table: "StockMovements",
                column: "StockId");

            migrationBuilder.AddForeignKey(
                name: "FK_StockMovements_Stocks_StockId",
                table: "StockMovements",
                column: "StockId",
                principalTable: "Stocks",
                principalColumn: "StockId");
        }
    }
}

import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AddUserToToDos1598234407659 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const column = new TableColumn({
      name: "user_id",
      type: "integer"
    });
    await queryRunner.addColumn("todos", column);

    const fk = new TableForeignKey({
      name: "UserTodo",
      columnNames: ["user_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "SET NULL",
    });
    await queryRunner.createForeignKey("todos", fk);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("todos", "UserTodo");
    await queryRunner.dropColumn("todos", "user_id");
  }

}

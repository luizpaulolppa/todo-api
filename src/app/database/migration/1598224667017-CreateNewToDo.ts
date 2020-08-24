import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateNewToDo1598224667017 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "todos",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "is_important",
            type: "integer",
            default: 0,
          },
          {
            name: "user_id",
            type: "integer",
            isNullable: false
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    );
    const fk = new TableForeignKey({
      name: "UserToDo",
      columnNames: ["user_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    });
    await queryRunner.createForeignKey("todos", fk);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("todos");
  }

}

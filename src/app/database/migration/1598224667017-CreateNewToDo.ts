import { MigrationInterface, QueryRunner, Table } from "typeorm";

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
            type: "text",
          },
          {
            name: "is_important",
            type: "integer",
            default: 0,
          },
          {
            name: "is_completed",
            type: "integer",
            default: 0,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("todos");
  }

}

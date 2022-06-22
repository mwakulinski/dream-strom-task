import { identity } from 'rxjs';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addUser1655922574692 implements MigrationInterface {
  name = 'addUser1655922574692';

  userTable = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isGenerated: true,
        isPrimary: true,
        generationStrategy: 'increment',
      },
      {
        name: 'email',
        type: 'text',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'password',
        type: 'text',
        isNullable: false,
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.userTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable);
  }
}

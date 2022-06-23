import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addWather1655986652662 implements MigrationInterface {
  name = 'addWather1655986652662';
  weatherTable = new Table({
    name: 'weather',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isGenerated: true,
        isPrimary: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'TEXT',
        isNullable: false,
      },
      {
        name: 'temp',
        type: 'REAL',
        isNullable: false,
      },
      {
        name: 'feels_like',
        type: 'REAL',
        isNullable: false,
      },
      {
        name: 'temp_min',
        type: 'REAL',
        isNullable: false,
      },
      {
        name: 'temp_max',
        type: 'REAL',
        isNullable: false,
      },
      {
        name: 'pressure',
        type: 'REAL',
        isNullable: false,
      },
      {
        name: 'humidity',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'sunrise',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'sunset',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'visibility',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'windSpeed',
        type: 'REAL',
        isNullable: false,
      },
      {
        name: 'windDeg',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'description',
        type: 'TEXT',
        isNullable: false,
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.weatherTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.weatherTable);
  }
}

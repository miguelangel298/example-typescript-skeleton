import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Integration1724012195722 implements MigrationInterface {
  protected tableName = 'integration';

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'int',
          generationStrategy: 'increment',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'company_db',
          type: 'varchar',
          length: '100',
          isUnique: true,
        },
        {
          name: 'username',
          type: 'varchar',
          length: '100',
        },
        {
          name: 'password',
          type: 'text',
        },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }

}

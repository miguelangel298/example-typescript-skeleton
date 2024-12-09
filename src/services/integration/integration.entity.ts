import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('integration')
export default class IntegrationEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_db: string;

  @Column()
  password: string;

  @Column()
  username: string;

}

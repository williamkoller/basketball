import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('players')
export class Player extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  surname: string;

  @Column('varchar')
  country: string;

  @Column({ type: 'varchar', name: 'number_position' })
  numberPosition: string;

  @Column({ type: 'varchar', name: 'last_attented' })
  lastAttented: string;

  @Column('varchar')
  height: string;

  @Column('varchar')
  weight: string;

  @Column('varchar')
  experience: string;

  @Column('varchar')
  age: string;

  @Column({ type: 'varchar', name: 'birth_date' })
  birthDate: string;

  constructor(partial: Partial<Player>) {
    super();
    Object.assign(this, partial);
  }
}

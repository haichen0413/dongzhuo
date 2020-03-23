import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nickname: string;

  @Column("text")
  description: string;

  @Column("double")
  status: number;

  @Column()
  isPub: boolean;
}

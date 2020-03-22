import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  status: number;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import User from "./User";

@Entity("todos")
export default class ToDo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ name: "is_important", default: false })
  isImportant: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

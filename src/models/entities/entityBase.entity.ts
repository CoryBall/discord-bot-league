import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

abstract class EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ nullable: false })
  created: Date;

  @UpdateDateColumn({ nullable: false })
  modified: Date;

  @DeleteDateColumn()
  deleted: Date;
}

export default EntityBase;

import { EntityBase } from './index';
import { Column, Entity } from 'typeorm';

@Entity()
class User extends EntityBase {
  @Column({ unique: true })
  summonerId: string;

  @Column()
  summonerName: string;

  @Column()
  discordId: string;
}

export default User;

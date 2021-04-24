import { Entity, Property } from '@mikro-orm/core';
import { EntityBase } from './index';

@Entity()
class User extends EntityBase {
  @Property({ unique: true })
  summonerId: string;

  @Property()
  summonerName: string;

  @Property()
  discordId: string;
}

export default User;

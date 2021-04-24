import { PrimaryKey, Property } from '@mikro-orm/core';

abstract class EntityBase {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ onCreate: () => false })
  deleted: boolean;
}

export default EntityBase;

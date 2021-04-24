import { Message } from 'discord.js';

export type Command = {
  name: string;
  description: string;
  usage?: string;
  roleNeeded?: string;
  execute(message: Message, args?: string[]): Promise<void>;
};

import { Message } from 'discord.js';

abstract class ICommand {
  public command: string;
  public description: string;
  public usage?: string;
  public roleNeeded?: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public execute(_message: Message, _args?: string[]): void {
    return;
  }
}

export { ICommand };

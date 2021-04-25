import { Message, MessageEmbed } from 'discord.js';
import { ICommand } from '../discord.types';
import { Container, Service } from 'typedi';
import { CommandToken } from './index';

@Service({ id: CommandToken, multiple: true })
class HelpCommand extends ICommand {
  public async execute(
    message: Message,
    args: string[] | undefined
  ): Promise<void> {
    const commands: ICommand[] = Container.getMany(CommandToken);

    const embeddedMessage = new MessageEmbed().setTitle(
      'LeagueBot command helper'
    );

    if (args && args.length !== 0) {
      const command = commands.find(
        (command: ICommand) => command.command === args[0]
      );
      if (command) {
        embeddedMessage.addField(
          command.command,
          `${command.usage}\n${command.description}`
        );
        await message.member?.send(embeddedMessage);
      } else {
        await message.member?.send(
          `Could not find specified command ${args[0]}`
        );
      }
    } else {
      commands.forEach((command: ICommand) => {
        embeddedMessage.addField(
          command.command,
          `${command.usage}\n${command.description}`
        );
      });
      await message.member?.send(embeddedMessage);
    }
  }

  constructor() {
    super();
    this.command = 'help';
    this.description = 'DMs user a list of all commands and how to use them.';
    this.usage = '"!help" or "!help < command >"';
  }
}

export default HelpCommand;

import { ICommand } from './discord.types';
import { Message, Client } from 'discord.js';
import { roleCheck } from './discord.utils';
import { Container, Service } from 'typedi';
import { CommandToken } from './commands';
import LinkCommand from './commands/link.command';
import HelpCommand from './commands/help.command';
import ChampCommand from './commands/champ.command';
import MatchCommand from './commands/match.command';

@Service()
class DiscordService {
  private commands: ICommand[];

  public init = async (): Promise<void> => {
    const client = new Client();
    const discordPrefix: string = process.env.DISCORD_BOT_PREFIX ?? '';
    Container.import([HelpCommand, LinkCommand, ChampCommand, MatchCommand]);
    this.commands = [];

    client.once('ready', async () => {
      console.log('Discord.Js Initiated');
      this.commands = Container.getMany(CommandToken);
    });
    client.on('message', (message: Message) => {
      if (!message.content.startsWith(discordPrefix) || message.author.bot)
        return;

      const [commandName, ...args] = message.content
        .slice(discordPrefix.length)
        .split(/ +/);

      const command = this.commands.find((c) => c.command == commandName);

      if (command) {
        const authorized = roleCheck(command, message.member?.roles);
        if (!authorized) {
          message.reply(`This command requires ${command.roleNeeded} role`);
        } else {
          console.log('running command: ', command.command);
          command.execute(message, args);
        }
      }
    });

    await client.login(process.env.DISCORD_BOT_TOKEN);
  };
}

export default DiscordService;

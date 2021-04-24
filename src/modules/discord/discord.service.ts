import glob from 'glob';
import { promisify } from 'util';
import { Command } from './discord.types';
import { Message, Client } from 'discord.js';
import { roleCheck } from './discord.utils';
import { Service } from 'typedi';

const globPromise = promisify(glob);

@Service()
class DiscordService {
  private commands: Command[];

  public init = async (): Promise<void> => {
    const client = new Client();
    const discordPrefix: string = process.env.DISCORD_BOT_PREFIX ?? '';

    client.once('ready', async () => {
      console.log('Discord.Js Initiated');
      const commandFiles = await globPromise(`${__dirname}/commands/*.{js,ts}`);

      for (const file of commandFiles) {
        const command = (await import(file)) as Command;
        this.commands.push(command);
      }
    });
    client.on('message', (message: Message) => {
      if (!message.content.startsWith(discordPrefix) || message.author.bot)
        return;

      const [commandName, ...args] = message.content
        .slice(discordPrefix.length)
        .split(/ +/);

      const command = this.commands.find((c) => c.name == commandName);

      if (command) {
        const authorized = roleCheck(command, message.member?.roles);
        if (!authorized) {
          message.reply(`This command requires ${command.roleNeeded} role`);
        } else {
          command.execute(message, args);
        }
      }
    });

    await client.login(process.env.DISCORD_BOT_TOKEN);
  };
}

export default DiscordService;

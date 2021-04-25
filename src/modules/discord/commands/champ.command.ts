import { Message, MessageEmbed } from 'discord.js';
import { ICommand } from '../discord.types';
import { Inject, Service } from 'typedi';
import { CommandToken } from './index';
import { LeagueService } from '../../league';
import { ChampionGuide } from '../../league/champion/champion.types';

@Service({ id: CommandToken, multiple: true })
class ChampCommand extends ICommand {
  @Inject()
  private leagueService: LeagueService;

  public async execute(
    message: Message,
    args: string[] | undefined
  ): Promise<void> {
    if (!message.member) {
      await message.reply('Something went wrong.');
      return;
    }
    if (!args) {
      await message.reply(
        'Incorrect format. Type "!help link" for the correct format'
      );
      return;
    }

    const guides = await this.leagueService.championService.getGuides(args[0]);
    if (guides?.length === 0) {
      await message.reply(
        `Could not find any champions with ${args[0]} in their name.`
      );
      return;
    }
    const embeddedMessage = new MessageEmbed().setTitle('Champ Helper');
    guides.forEach((guide: ChampionGuide) => {
      embeddedMessage.addField(guide.name, guide.url);
    });
    await message.reply(embeddedMessage);
  }

  constructor() {
    super();
    this.command = 'champ';
    this.description = 'Sends back links to builds/runes/counters for champ';
    this.usage = '"!champ < champ name >" ex: "!champ yas"';
  }
}

export default ChampCommand;

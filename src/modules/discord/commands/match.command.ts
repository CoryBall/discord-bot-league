import { Message } from 'discord.js';
import { ICommand } from '../discord.types';
import { Inject, Service } from 'typedi';
import { CommandToken } from './index';
import { LeagueService } from '../../league';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { User } from '../../../models/entities';

@Service({ id: CommandToken, multiple: true })
class MatchCommand extends ICommand {
  @InjectRepository(User)
  private userRepo: Repository<User>;
  @Inject()
  private leagueService: LeagueService;

  public async execute(message: Message): Promise<void> {
    if (!message.member) {
      await message.reply('Something went wrong.');
      return;
    }

    const user = await this.userRepo.findOne({ discordId: message.member.id });
    if (!user) {
      await message.reply(
        'You have not linked your summoner! Run "!link < summoner name>" then try again.'
      );
      return;
    }

    const currentMatchUrl = await this.leagueService.summonerService.getCurrentMatch(
      user.summonerName
    );

    await message.reply(currentMatchUrl);
  }

  constructor() {
    super();
    this.command = 'match';
    this.description = "Sends back a link to your current game's stats";
    this.usage = '"!match"';
  }
}

export default MatchCommand;

import { Message, MessageEmbed } from 'discord.js';
import { ICommand } from '../discord.types';
import { Inject, Service } from 'typedi';
import { LeagueService } from '../../league';
import { User } from '../../../models/entities';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { CommandToken } from './index';

@Service({ id: CommandToken, multiple: true })
class LinkCommand extends ICommand {
  @InjectRepository(User)
  protected userRepo: Repository<User>;
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
    const summonerName = args.join(' ').trim();
    const existsCheck = await this.userRepo.findOne({
      discordId: message.member.id,
    });
    if (existsCheck) {
      await message.reply('Your accounts are already linked.');
      return;
    }
    const summoner = await this.leagueService.summonerService.getSummonerByName(
      summonerName
    );
    // create new user
    try {
      const newUser: User = new User();
      newUser.discordId = message.member?.id;
      newUser.summonerId = summoner.id;
      newUser.summonerName = summoner.name;
      await this.userRepo.save(newUser);
    } catch (error) {
      console.error('Could not save new user.', error);
      throw new Error(error);
    }
    const summonerIcon = this.leagueService.summonerService.accountIcon(
      summoner.profileIconId
    );
    const embeddedMessage = new MessageEmbed()
      .setColor('#937341')
      .setTitle(summoner.name)
      .setDescription('Summoner Linked!')
      .setThumbnail(summonerIcon)
      .addField('Level', summoner.summonerLevel);
    await message.reply(embeddedMessage);
  }

  constructor() {
    super();
    this.command = 'link';
    this.description = 'Links your summoner name with your discord account';
    this.usage = '"!link < summoner name >"';
  }
}

export default LinkCommand;

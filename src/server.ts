import 'reflect-metadata';
import { Container } from 'typedi';
import { AppService } from './modules/app';
import DiscordService from './modules/discord/discord.service';
import { OrmService } from './modules/orm';

void (async () => {
  const appService: AppService = Container.get(AppService);
  const ormService: OrmService = Container.get(OrmService);
  const discordService: DiscordService = Container.get(DiscordService);
  await ormService.init();
  await appService.init();
  await discordService.init();
})();

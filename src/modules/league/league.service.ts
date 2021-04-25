import { Inject, Service } from 'typedi';
import SummonerService from './summoner/summoner.service';
import ChampionService from './champion/champion.service';

@Service()
class LeagueService {
  @Inject()
  public summonerService: SummonerService;
  @Inject()
  public championService: ChampionService;
}

export default LeagueService;

import { Container, Inject, Service } from 'typedi';
import axios from 'axios';
import { SummonerDTO } from './summoner.types';
import LeagueConfig from '../league.config';

@Service()
class SummonerService {
  @Inject()
  private leagueConfig: LeagueConfig = Container.get(LeagueConfig);
  public async getSummonerByName(summonerName: string): Promise<SummonerDTO> {
    try {
      const url = `${this.leagueConfig.summonerNameAPI}/${encodeURI(
        summonerName
      )}`;
      const summoner = await axios.get<SummonerDTO>(url);
      return summoner.data;
    } catch (error) {
      console.error('Could not retrieve summoner by name.', error);
      throw new Error(error);
    }
  }
  public accountIcon(iconId: number): string {
    return `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/${iconId}.png`;
  }
  public getCurrentMatch(summonerName: string): string {
    return `https://porofessor.gg/live/na/${encodeURI(summonerName)}`;
  }
  constructor() {
    axios.defaults.headers.common['X-Riot-Token'] = this.leagueConfig.token;
  }
}

export default SummonerService;

import { Container, Inject, Service } from 'typedi';
import axios from 'axios';
import LeagueConfig from '../league.config';
import { ChampionGuide, ChampionResult } from './champion.types';

@Service()
class ChampionService {
  @Inject()
  private leagueConfig: LeagueConfig = Container.get(LeagueConfig);
  public async getGuides(championSearch: string): Promise<ChampionGuide[]> {
    try {
      const url = `http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json`;
      const result = await axios.get<ChampionResult>(url);
      const champions = result.data.data;
      const foundChampions: string[] = Object.keys(champions).filter((name) =>
        name.toLowerCase().includes(championSearch.toLowerCase())
      );

      const guides: ChampionGuide[] = [];
      foundChampions.forEach((name) => {
        guides.push({
          name,
          url: `https://app.mobalytics.gg/lol/champions/${name}/build`,
        });
      });
      return guides;
    } catch (error) {
      console.error('Could not retrieve champion data.', error);
      throw new Error(error);
    }
  }
  constructor() {
    axios.defaults.headers.common['X-Riot-Token'] = this.leagueConfig.token;
  }
}

export default ChampionService;

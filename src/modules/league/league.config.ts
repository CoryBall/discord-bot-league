import { Service } from 'typedi';

@Service()
class LeagueConfig {
  private baseHost = 'https://na1.api.riotgames.com';
  public token: string = process.env.LEAGUE_API_TOKEN ?? '';
  public summonerNameAPI = `${this.baseHost}/lol/summoner/v4/summoners/by-name`;
}

export default LeagueConfig;

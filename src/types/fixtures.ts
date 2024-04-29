export interface IFixtures {
    away: Team;
    displayTournament: boolean;
    home: Team;
    id: number;
    notStarted: boolean;
    opponent: Team;
    pageUrl: string;
    status: MatchStatus;
    tournament: Tournament;
  }
  
  interface Team {
    id: number;
    name: string;
    score: number;
  }
  
  interface MatchStatus {
    utcTime: string;
    started: boolean;
    cancelled: boolean;
    finished: boolean;
  }
  
  interface Tournament {
    name: string;
    leagueId: number;
  }
  
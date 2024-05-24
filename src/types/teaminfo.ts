export interface ITeamInfo {
    details : {
        name:string;
        country : string;
        sportsTeamJSONLD : {
            logo: string;
            location : {
                name : string;
            }
        }
        shortName : string;
        primaryLeagueId : number;
    }
    history : {
        teamColor : string;
    }
}
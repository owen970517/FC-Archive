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
    }
    history : {
        teamColor : string;
    }
}
interface Trophy {
    ccode: string;
    leagueId: number;
    leagueName: string;
    seasonsWon: string[]
    seasonsRunnerUp: string[]
}

interface TeamTrophy {
    ccode: string;
    teamId: number;
    teamName: string;
    tournaments: Trophy[];
}

interface Stats {
    localizedTitleId : string;
    title : string;
    value :number;
}

interface PlayerInfo {
    title : string;
    value : {   
        fallback:string;
        key : string | null;
        numberValue : number;
    }
}

interface CoachHistorical {
    teamId : number ;
    teamName : string;
    startDate : {
        utcTime : string
    }
    endDate : {
        utcTime : string
    }
    matches : number;
    wins : number;
    losses : number;
    draws : number;
    pointsPerGame : number;
    winPercentage : number;
    teamColors : {
        darkMode :string;
        fontDarkMode : string;
        lightMode : string;
        fontLightMode : string;
    }
}

export interface IMemberDetails {
    isCoach : boolean;
    name : string;
    id : number;
    coachStats : {
        activeCareerEntry : {
            matches : number;
            wins : number;
            losses : number;
            draws : number;
            teamId: number;
            teamName : string;
        },
        historicalCareerEntries : CoachHistorical[],
    }
    mainLeague : {
        stats : Stats[],
    },
    playerInformation : PlayerInfo[],
    trophies : {
        coachTrophies : TeamTrophy[],
        playerTrophies : TeamTrophy[]
    }
}
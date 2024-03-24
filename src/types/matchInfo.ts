export interface IMatchInfo {
    matchDate: string
    matchId: string;
    matchInfo : [
        {
            nickname?:string;
            ouid:string;
            matchDetail : {
                averageRating? : number;
                controller? : string;
                matchResult:string;
                possession : number;
                offsideCount:number;
                cornerKick:number;
                yellowCards:number;
                redCards:number;
                foul :number;
            }
            player : [
                {
                    spGrade: number;
                    spId: number;
                    spPosition: number;
                    status: PlayerStatus;
                }
            ]
            shoot : {
                goalTotal :number;
                shootTotal : number;
                effectiveShootTotal:number;
            }
            pass: {
                passTry : number;
                passSuccess:number;
            }
        },
        {
            nickname?:string;
            ouid:string;
            matchDetail : {
                averageRating? : number;
                controller? : string;
                matchResult:string;
                offsideCount:number;
                possession : number;
                cornerKick:number;
                yellowCards:number;
                redCards:number;
                foul :number;
            }
            player : [
                {
                    spGrade: number;
                    spId: number;
                    spPosition: number;
                    status: PlayerStatus;
                }
            ]
            shoot : {
                goalTotal :number;
                shootTotal : number;
                effectiveShootTotal:number;
            }
            pass: {
                passTry : number;
                passSuccess:number;
            }
        }
    ]
}

interface PlayerStatus  {
    aerialSuccess: number;
    aerialTry: number;
    assist: number;
    ballPossesionSuccess: number;
    ballPossesionTry: number;
    block: number;
    blockTry: number;
    defending: number;
    dribble: number;
    dribbleSuccess: number;
    dribbleTry: number;
    effectiveShoot: number;
    goal: number;
    intercept: number;
    passSuccess: number;
    passTry: number;
    redCards: number;
    shoot: number;
    spRating: number;
    tackle: number;
    tackleTry: number;
    yellowCards: number;
  };
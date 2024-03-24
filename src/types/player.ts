interface PlayerStatus {
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
}
  
export interface IPlayer {
    spGrade: number;
    spId: number;
    spPosition: number;
    status: PlayerStatus;
}
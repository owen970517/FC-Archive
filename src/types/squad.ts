export interface ISquad {
    members: Member[];
    title: string;
}

export interface Member {
    assists: number;
    ccode: string;
    cname: string;
    excludeFromRanking: boolean;
    goals: number;
    id: number;
    name: string;
    penalties: number;
    positionId: number;
    rating: number | null;
    rcards: number;
    role: {
      key: string;
      fallback: string;
    };
    shirtNumber: number;
    ycards: number;
  }

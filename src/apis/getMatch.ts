interface IMatchId {
    ouid: string;
    type: number;
    offset: number;
}

export interface IPages {
    data : string[];
    nextOffset : number;
}
  
export interface MatchIdResponse {
    pageParams : number[];
    pages : IPages[];
}

export const fetchMatchId = async ({ouid,type,offset}:IMatchId):Promise<IPages> => {
    try {
        const urlString = `https://open.api.nexon.com/fconline/v1/user/match?ouid=${ouid}&matchtype=${type}&offset=${offset}&limit=10`;
        const response = await fetch(urlString, { headers: { "x-nxopen-api-key": process.env.REACT_APP_API_KEY! } });
        const data = await response.json();
        return {data,nextOffset: offset + 10}
    } catch(error) {
        console.error(error);
        throw error;
    }
}

export const fetchMatchDetails = async (id: string) => {
    try {
        const urlString = `https://open.api.nexon.com/fconline/v1/match-detail?matchid=${id}`;
        const response = await fetch(urlString, { headers: { "x-nxopen-api-key": process.env.REACT_APP_API_KEY! } });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
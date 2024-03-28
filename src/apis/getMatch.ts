export const fetchMatchId = async ({ouid,type,offset}:{ouid:string,type:number,offset:number}) => {
    try {
        const urlString = `https://open.api.nexon.com/fconline/v1/user/match?ouid=${ouid}&matchtype=${type}&offset=${offset}&limit=10`;
        const response = await fetch(urlString, { headers: { "x-nxopen-api-key": process.env.REACT_APP_API_KEY! } });
        const data = await response.json();
        return data
    } catch(error) {
        console.error(error);
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
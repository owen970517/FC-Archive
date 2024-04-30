import axios from "axios";

export const getLeagues = async (nowid:number) => {
    const response = await axios.get(`/api/leagues?type=team&timezone=Asia/Seoul&id=${nowid}&tab=overview`);
    return response.data.table[0].data.table.all
}

export const getTeamInfo = async (teamid:number) => {
    const response = await axios.get(`/api/teams?type=team&timezone=Asia/Seoul&id=${teamid}`);
    return response.data
}

export const getSquad = async (teamid:number) => {
    const response = await axios.get(`/api/teams?type=team&timezone=Asia/Seoul&id=${teamid}`);
    return response.data.squad
}

export const getFixtures = async (teamid:number) => {
    const response = await axios.get(`/api/teams?type=team&timezone=Asia/Seoul&id=${teamid}`);
    return response.data.fixtures.allFixtures.fixtures
}

export const getMemberDetails = async (id:number) => {
    const response = await axios.get(`/api/playerData?id=${id}`);
    return response.data
}
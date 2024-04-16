import React, { useEffect, useState } from 'react'
import { IPlayer } from '../../types/player'
import styled from 'styled-components'
import CloseBtn from '../../assets/close.svg'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { matchActions } from '../../store/matchSlice';
interface ISeason {
    seasonId : number;
    className : string;
    seasonImg : string;
}

const PlayerDetail = ({player,formation,name} : {player:IPlayer,formation:string,name:string}) => {
    const dispatch = useDispatch()
    const {isModal} = useSelector((state:RootState) => state.matches)
    const [season , setSeason] = useState<ISeason[]>([]);

    const handleClose = () => {
        dispatch(matchActions.setIsModal(!isModal))
    }

    useEffect(() => {
        const fetchSeasonIdData = async () => {
          try {
            const response = await fetch('/seasonid.json');
            const data = await response.json();
            setSeason(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchSeasonIdData();
    }, []);
    const now = season.find((s) => s.seasonId === Number(String(player.spId).slice(0,3)))
      
  return (
    <PlayerWrapper>
        <Close src={CloseBtn} alt='close' onClick={handleClose}/>
        <Player>
            <PlayerImageWrapper>
                <PlayerImage src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${player.spId}.png`}/>
            </PlayerImageWrapper>
            <h3>{name ? name : ''}</h3>
        </Player>
        <PlayerInfo>
            <InfoItem>
                <span>포지션</span>
                <span>{formation}</span>
            </InfoItem>
            <InfoItem>
                <span>선수 시즌</span>
                <img src={now?.seasonImg} alt='img'/>
            </InfoItem>
            <InfoItem>
                <span>강화 등급</span>
                <Grade grade={player.spGrade}>
                    <span>{player.spGrade}</span>
                </Grade>
            </InfoItem>
        </PlayerInfo>
        <PlayerStatus>
            <h3>주요 통계</h3>
            <StatusItem>
                <StatusName>평점</StatusName>
                <StatusValue>{player.status.spRating}</StatusValue>
            </StatusItem>
            <StatusItem>
                <StatusName>득점</StatusName>
                <StatusValue>{player.status.goal}</StatusValue>
            </StatusItem>
            <StatusItem>
                <StatusName>어시스트</StatusName>
                <StatusValue>{player.status.assist}</StatusValue>
            </StatusItem>
            <StatusItem>
                <StatusName>슈팅</StatusName>
                <StatusValue>{player.status.shoot}</StatusValue>
            </StatusItem>
            <StatusItem>
                <StatusName>유효 슈팅</StatusName>
                <StatusValue>{player.status.effectiveShoot}</StatusValue>
            </StatusItem>
            <StatusItem>
                <StatusName>드리블</StatusName>
                <StatusValue>{player.status.dribbleTry}</StatusValue>
            </StatusItem>
            <StatusItem>
                <StatusName>드리블 성공</StatusName>
                <StatusValue>{player.status.dribbleSuccess}</StatusValue>
            </StatusItem>
            <StatusItem>
                <StatusName>패스</StatusName>
                <StatusValue>{player.status.passTry}</StatusValue>
            </StatusItem>
            <StatusItem>
                <StatusName>패스 성공</StatusName>
                <StatusValue>{player.status.passSuccess}</StatusValue>
            </StatusItem>
            <StatusItem>
                <StatusName>공중 경합</StatusName>
                <StatusValue>{player.status.aerialTry}</StatusValue>
            </StatusItem>
            <StatusItem>
                <StatusName>태클</StatusName>
                <StatusValue>{player.status.tackle}</StatusValue>
            </StatusItem>
            <StatusItem>
                <StatusName>경고</StatusName>
                <StatusValue>{player.status.yellowCards}</StatusValue>
            </StatusItem>
            <StatusItem>
                <StatusName>퇴장</StatusName>
                <StatusValue>{player.status.redCards}</StatusValue>
            </StatusItem>
        </PlayerStatus>
    </PlayerWrapper>
  )
}

const PlayerWrapper = styled.div`
    position: relative;
    width: 50%;
    height: 80%;
    background-color: #fff;
    border-radius: 10px;
`

const Player = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
`

const PlayerImageWrapper = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0,0,0,0.5);
`
const PlayerImage = styled.img`
    width : 100%;
    height: 100%;
    object-fit: cover;
`

const PlayerInfo = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 1rem;
`

const InfoItem = styled.div`
    display: grid;
    row-gap: 9px;
    grid-template-rows: repeat(2, minmax(20px, auto));
    place-items: center;
    margin-bottom: 10px;
    img {
        height: 25px;
        width: auto;
    }
`

const Grade = styled.div<{grade:number}>`
    padding: 0px 0.7rem;
    height: 25px;
    color: ${({ grade }) => {
        if (grade === 1) return '#c5c8c9';
        else if (grade >= 2 && grade <= 4) return '#7e3f27';
        else if (grade >= 5 && grade <= 7) return '#4e545e'; 
        else if (grade === 8) return '#695100';
    }};
    background: ${({ grade }) => {
        if (grade === 1) return 'linear-gradient(140deg, #51545a 0%, #42464d 100%)';
        else if (grade >= 2 && grade <= 4) return 'linear-gradient(140deg, #de946b 0%, #ad5f42 100%)';
        else if (grade >= 5 && grade <= 7) return 'linear-gradient(140deg, rgb(2, 0, 36) 0%, rgb(216, 217, 220) 0%, rgb(184, 189, 202) 100%)';
        else if (grade === 8) return 'linear-gradient(140deg, #f9dd62 0%, #dca908 100%)';
    }};
    border: ${({ grade }) => {
        if (grade === 1) return '1.5px solid #393a3c';
        else if (grade >= 2 && grade <= 4) return '1.5px solid #864229';
        else if (grade >= 5 && grade <= 7) return '1.5px solid #a5a8ae'; 
        else if (grade === 8) return '1.5px solid #cda000';
    }};
    border-top-color: ${({ grade }) => {
        if (grade === 1) return '#62676d';
        else if (grade >= 2 && grade <= 4) return '#e4b7a2';
        else if (grade >= 5 && grade <= 7) return '#d8dadc';
        else if (grade === 8) return '#e9d36c';
    }};
    border-left-color: ${({ grade }) => {
        if (grade === 1) return '#62676d';
        else if (grade >= 2 && grade <= 4) return '#e4b7a2';
        else if (grade >= 5 && grade <= 7) return '#d8dadc ';
        else if (grade === 8) return '#e9d36c';
    }};
    border-right-color: ${({ grade }) => {
        if (grade === 1) return '#393a3c';
        else if (grade >= 2 && grade <= 4) return '#864229';
        else if (grade >= 5 && grade <= 7) return '#a9aaae ';
        else if (grade === 8) return '#cda000';
    }};
`

const PlayerStatus = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    padding: 10px;
    background-color: #f7f7f7;
    border-radius: 10px;
    margin-top: 20px; 
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    font-family: 'Noto Sans KR', sans-serif;
    margin : 0 auto;
    overflow-y: auto; 
    max-height: 250px;


    &::-webkit-scrollbar {
        width: 8px; 
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1; 
        border-top-right-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
`

const StatusItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eaeaea;
    &:last-child {
        border-bottom: none;
    }
`

const StatusName = styled.span`
    color: #333; 
    font-weight: 600; 
    font-size: 0.9rem; 
`

const StatusValue = styled.span`
    color: #666; 
    font-size: 0.9rem;
`
const Close = styled.img`
    position: absolute;
    width:50px;
    right : 10px;
    cursor: pointer;
`
export default PlayerDetail
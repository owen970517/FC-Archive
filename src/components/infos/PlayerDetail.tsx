import React, { useEffect, useState } from 'react'
import { IPlayer } from '../../types/player'
import CloseBtn from '../../assets/close.svg'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { matchActions } from '../../store/matchSlice';
import * as S from '../../styles/Player.styled';
interface ISeason {
    seasonId : number;
    className : string;
    seasonImg : string;
}

const PlayerDetail = ({player,formation,name} : {player:IPlayer,formation:string,name:string}) => {
    const dispatch = useDispatch()
    const {isModal} = useSelector((state:RootState) => state.matches)
    const [season , setSeason] = useState<ISeason[]>([]);
    const [imgUrl, setImgUrl] = useState(`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${player!.spId}.png`)
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

    const handleImgError = (id:number) => {
        setImgUrl(`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${Number(id.toString().slice(3))}.png`)
    }

    const now = season.find((s) => s.seasonId === Number(String(player.spId).slice(0,3)))
      
  return (
    <S.PlayerWrapper>
        <S.Close src={CloseBtn} alt='close' onClick={handleClose}/>
        <S.Player>
            <S.PlayerImageWrapper>
                <S.PlayerImage 
                    src={imgUrl}
                    onError={() => handleImgError(player.spId)}
                />
            </S.PlayerImageWrapper>
            <h3>{name ? name : ''}</h3>
        </S.Player>
        <S.PlayerInfo>
            <S.InfoItem>
                <span>포지션</span>
                <span>{formation}</span>
            </S.InfoItem>
            <S.InfoItem>
                <span>선수 시즌</span>
                <img src={now?.seasonImg} alt='img'/>
            </S.InfoItem>
            <S.InfoItem>
                <span>강화 등급</span>
                <S.Grade grade={player.spGrade}>
                    <span>{player.spGrade}</span>
                </S.Grade>
            </S.InfoItem>
        </S.PlayerInfo>
        <S.PlayerStatus>
            <h3>주요 통계</h3>
            <S.StatusItem>
                <S.StatusName>평점</S.StatusName>
                <S.StatusValue>{player.status.spRating}</S.StatusValue>
            </S.StatusItem>
            <S.StatusItem>
                <S.StatusName>득점</S.StatusName>
                <S.StatusValue>{player.status.goal}</S.StatusValue>
            </S.StatusItem>
            <S.StatusItem>
                <S.StatusName>어시스트</S.StatusName>
                <S.StatusValue>{player.status.assist}</S.StatusValue>
            </S.StatusItem>
            <S.StatusItem>
                <S.StatusName>슈팅</S.StatusName>
                <S.StatusValue>{player.status.shoot}</S.StatusValue>
            </S.StatusItem>
            <S.StatusItem>
                <S.StatusName>유효 슈팅</S.StatusName>
                <S.StatusValue>{player.status.effectiveShoot}</S.StatusValue>
            </S.StatusItem>
            <S.StatusItem>
                <S.StatusName>드리블</S.StatusName>
                <S.StatusValue>{player.status.dribbleTry}</S.StatusValue>
            </S.StatusItem>
            <S.StatusItem>
                <S.StatusName>드리블 성공</S.StatusName>
                <S.StatusValue>{player.status.dribbleSuccess}</S.StatusValue>
            </S.StatusItem>
            <S.StatusItem>
                <S.StatusName>패스</S.StatusName>
                <S.StatusValue>{player.status.passTry}</S.StatusValue>
            </S.StatusItem>
            <S.StatusItem>
                <S.StatusName>패스 성공</S.StatusName>
                <S.StatusValue>{player.status.passSuccess}</S.StatusValue>
            </S.StatusItem>
            <S.StatusItem>
                <S.StatusName>공중 경합</S.StatusName>
                <S.StatusValue>{player.status.aerialTry}</S.StatusValue>
            </S.StatusItem>
            <S.StatusItem>
                <S.StatusName>태클</S.StatusName>
                <S.StatusValue>{player.status.tackle}</S.StatusValue>
            </S.StatusItem>
            <S.StatusItem>
                <S.StatusName>경고</S.StatusName>
                <S.StatusValue>{player.status.yellowCards}</S.StatusValue>
            </S.StatusItem>
            <S.StatusItem>
                <S.StatusName>퇴장</S.StatusName>
                <S.StatusValue>{player.status.redCards}</S.StatusValue>
            </S.StatusItem>
        </S.PlayerStatus>
    </S.PlayerWrapper>
  )
}

export default PlayerDetail
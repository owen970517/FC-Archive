import React from 'react'
import * as S from '../../styles/Player.styled';


const CoachDetail = ({coach} : {coach:any}) => {
  return (
    <>
        <S.Player>
            <S.PlayerImageWrapper>
                <S.PlayerImage src={`https://images.fotmob.com/image_resources/playerimages/${coach?.id}.png`}/>
            </S.PlayerImageWrapper>
            <h3>{coach.name}</h3>
        </S.Player>
        <S.PlayerInfo>
            <S.InfoItem>
                <span>포지션</span>
                <span>감독</span>
            </S.InfoItem>
            <S.InfoItem>
                <span>나이</span>
                <span>{coach?.playerInformation[0].value.numberValue}</span>
            </S.InfoItem>
            <S.InfoItem>
                <span>국적</span>
                <span>{coach?.playerInformation[1].value.fallback}</span>
            </S.InfoItem>
        </S.PlayerInfo>
        <S.PlayerStatus>
              <h3>코치 스탯</h3>
              <S.StatusItem>
                <S.StatusName>경기</S.StatusName>
                <S.StatusValue>{coach?.coachStats.activeCareerEntry.matches}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusName>승리</S.StatusName>
                <S.StatusValue>{coach?.coachStats.activeCareerEntry.wins}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusName>패배</S.StatusName>
                <S.StatusValue>{coach?.coachStats.activeCareerEntry.losses}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusName>무승부</S.StatusName>
                <S.StatusValue>{coach?.coachStats.activeCareerEntry.draws}</S.StatusValue>
              </S.StatusItem>
            </S.PlayerStatus>
    </>
  )
}

export default CoachDetail
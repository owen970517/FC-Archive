import React, { useMemo } from 'react'
import * as S from '../../styles/Player.styled';
import { IMemberDetails } from '../../types/memberDetail';
import { enToKrKeeper } from '../../constants/member';

const GoalKeeper = ({keeper} : {keeper:IMemberDetails}) => {
    const totalTournaments = useMemo(() => {
        const playerTrophies = keeper?.trophies?.playerTrophies;
        if (!playerTrophies) {
          return 0;
        }
        return playerTrophies.reduce((acc, player) => acc + player.tournaments.length, 0);
      }, [keeper]);
  return (
    <>
      <S.Player>
        <S.PlayerImageWrapper>
            <S.PlayerImage src={`https://images.fotmob.com/image_resources/playerimages/${keeper?.id}.png`}/>
        </S.PlayerImageWrapper>
        <h3>{keeper.name}</h3>
      </S.Player>
      <S.PlayerInfo>
        <S.InfoItem>
          <span>키/나이</span>
          <span>{keeper?.playerInformation[0]?.value.numberValue}/{keeper?.playerInformation[2].value.numberValue}</span>
        </S.InfoItem>
        <S.InfoItem>
            <span>등번호</span>
            <span>{keeper?.playerInformation[1].value.numberValue}</span>
        </S.InfoItem>
        <S.InfoItem>
            <span>국적</span>
            <span>{keeper?.playerInformation[5].value.fallback}</span>
        </S.InfoItem>
      </S.PlayerInfo>
      <S.PlayerStatus>
        <h3>골키퍼 스탯</h3>
        <S.StatusItem>
          <S.StatusName>총 우승 횟수</S.StatusName>
          <S.StatusValue>{totalTournaments}</S.StatusValue>
        </S.StatusItem>
        {keeper.mainLeague.stats.map((stat) => (
          <S.StatusItem key={stat.localizedTitleId}>
            <S.StatusName>{enToKrKeeper[stat.title]}</S.StatusName>
            <S.StatusValue>{stat.value}</S.StatusValue>
          </S.StatusItem>
        ))}
      </S.PlayerStatus>
    </>
  )
}

export default GoalKeeper
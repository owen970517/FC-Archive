import React, { useMemo } from 'react'
import * as S from '../../styles/Player.styled';
import { IMemberDetails } from '../../types/memberDetail';
import { enToKrMember } from '../../constants/member';

const Memeber = ({member}:{member:IMemberDetails}) => {
  const totalTournaments = useMemo(() => {
    const playerTrophies = member?.trophies?.playerTrophies;
    if (!playerTrophies) {
      return 0;
    }
    return playerTrophies.reduce((acc, player) => acc + player.tournaments.length, 0);
  }, [member]);

  const marketValue = member.playerInformation.filter((info) => info.title === 'Market value')
  const preferredFoot = member.playerInformation.filter((info) => info.title === 'Preferred foot')
  
  return (
    <>
      <S.Player>
        <S.PlayerImageWrapper>
          <S.PlayerImage src={`https://images.fotmob.com/image_resources/playerimages/${member?.id}.png`}/>
        </S.PlayerImageWrapper>
        <h3>{member?.name}</h3>
      </S.Player>
      <S.PlayerInfo>
        <S.InfoItem>
          <span>키/나이</span>
          <span>{member?.playerInformation[0]?.value.numberValue}/{member?.playerInformation[2].value.numberValue}</span>
        </S.InfoItem>
        <S.InfoItem>
          <span>등번호</span>
          <span>{member?.playerInformation[1].value.numberValue}</span>
        </S.InfoItem>
        <S.InfoItem>
          <span>시장 가치</span>
          <span>{marketValue[0].value.fallback}</span>
        </S.InfoItem>
      </S.PlayerInfo>
      <S.PlayerStatus>
        <h3>선수 스탯</h3>
        <S.StatusItem>
          <S.StatusName>총 우승 횟수</S.StatusName>
          <S.StatusValue>{totalTournaments}</S.StatusValue>
        </S.StatusItem>
        { preferredFoot.length > 0 && 
          <S.StatusItem>
            <S.StatusName>주발</S.StatusName>
            <S.StatusValue>{enToKrMember[preferredFoot[0].value.fallback]}</S.StatusValue>
          </S.StatusItem>
        }
        {member.mainLeague.stats.map((stat) => (
          <S.StatusItem key={stat.localizedTitleId}>
            <S.StatusName>{enToKrMember[stat.title]}</S.StatusName>
            <S.StatusValue>{stat.value}</S.StatusValue>
          </S.StatusItem>
        ))}
      </S.PlayerStatus>
    </>
  )
}

export default Memeber
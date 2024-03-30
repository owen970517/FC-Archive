import React from 'react'
import { IMatchInfo } from '../../types/matchInfo'
import styled from 'styled-components'
import Pad from '../../assets/pad.svg'
import Keyboard from '../../assets/keyboard.svg'

const AnalyzeGame = ({info}:{info:IMatchInfo}) => {
  return (
    <MatchInfo>
        <InfoItem>
            <h3>{info.matchInfo[0].matchDetail.controller === 'keyboard' ? <img src={Keyboard} alt='keyboard' width={40} height={40}/>: <img src={Pad} alt='pad' width={40} height={40}/>}</h3>
            <h2>컨트롤러</h2>
            <h3>{info.matchInfo[1].matchDetail.controller === 'keyboard' ? <img src={Keyboard} alt='keyboard' width={40} height={40}/>: <img src={Pad} alt='pad' width={40} height={40}/>}</h3> 
        </InfoItem>
        <InfoItem>
            <h3>{info.matchInfo[0].shoot.shootTotal}</h3>
            <h2>슈팅</h2>
            <h3>{info.matchInfo[1].shoot.shootTotal}</h3> 
        </InfoItem>
        <InfoItem>
            <h3>{info.matchInfo[0].shoot.effectiveShootTotal}</h3> 
            <h2>유효슈팅</h2>
            <h3>{info.matchInfo[1].shoot.effectiveShootTotal}</h3>
        </InfoItem>
        <InfoItem>
            <h3>{info.matchInfo[0].matchDetail.possession}% </h3>
            <h2> 점유율</h2>
            <h3>{info.matchInfo[1].matchDetail.possession}%</h3>
        </InfoItem>
        <InfoItem>
            <h3>{info.matchInfo[0].pass.passTry}</h3>
            <h2>패스 횟수</h2>
            <h3>{info.matchInfo[1].pass.passTry}</h3>
        </InfoItem>
        <InfoItem>
            <h3>{Math.floor((info.matchInfo[0].pass.passSuccess / info.matchInfo[0].pass.passTry) * 100)}% </h3>
            <h2>패스 성공률</h2>
            <h3>{Math.floor((info.matchInfo[1].pass.passSuccess / info.matchInfo[1].pass.passTry) * 100)}% </h3>
        </InfoItem>
        <InfoItem>
            <h3>{info.matchInfo[0].matchDetail.foul}</h3>
            <h2>파울</h2>
            <h3>{info.matchInfo[1].matchDetail.foul}</h3>
        </InfoItem>
        <InfoItem>
            <h3>{info.matchInfo[0].matchDetail.cornerKick}</h3>
            <h2>코너킥</h2>
            <h3>{info.matchInfo[1].matchDetail.cornerKick}</h3>
        </InfoItem>
        <InfoItem>
            <h3>{info.matchInfo[0].matchDetail.offsideCount}</h3>
            <h2>오프사이드</h2>
            <h3>{info.matchInfo[1].matchDetail.offsideCount}</h3>
        </InfoItem>
        <InfoItem>
            <h3>{info.matchInfo[0].matchDetail.yellowCards}</h3>
            <h2>옐로 카드</h2>
            <h3>{info.matchInfo[1].matchDetail.yellowCards}</h3>
        </InfoItem>
        <InfoItem>
            <h3>{info.matchInfo[0].matchDetail.redCards}</h3>
            <h2>레드 카드</h2>
            <h3>{info.matchInfo[1].matchDetail.redCards}</h3>
        </InfoItem>
    </MatchInfo>
  )
}

const MatchInfo = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    margin : 0 auto;
`
const InfoItem = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`

export default AnalyzeGame
import React, { useState } from 'react'
import TeamSquad from './TeamSquad'
import Fixtures from './Fixtures'
import styled from 'styled-components'
import Header from '../../common/Header'
import TeamInfo from './TeamInfo'

const TeamDetails = () => {
    const [isSquad , setIsSquad] = useState(true);
    const toggleButton = () => {
        setIsSquad(prev => !prev)
    }
  return (
    <>
        <Header/>
        <Wrapper>
            <StyledBtn onClick={toggleButton} $toggle={isSquad}>스쿼드</StyledBtn>
            <StyledBtn onClick={toggleButton} $toggle={!isSquad}>경기 일정</StyledBtn>
        </Wrapper>
        {isSquad ? 
            <>
                <TeamInfo/>
                <TeamSquad/>
            </>
         : 
            <>
                <TeamInfo/>
                <Fixtures/>
            </>
         }
    </>
  )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const StyledBtn =styled.button<{$toggle:boolean}>`
    background-color: ${(props) => props.$toggle ? '#000' : ''};
    color :${(props) => props.$toggle ? 'var(--textDefault)' : ''};
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
`

export default TeamDetails
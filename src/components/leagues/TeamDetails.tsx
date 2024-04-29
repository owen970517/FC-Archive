import React, { useState } from 'react'
import TeamSquad from './TeamSquad'
import Fixtures from './Fixtures'
import styled from 'styled-components'
import Header from '../../common/Header'

const TeamDetails = () => {
    const [isSquad , setIsSquad] = useState(true);
    const toggleButton = () => {
        setIsSquad(prev => !prev)
    }
  return (
    <>
        <Header/>
        <Wrapper>
            <StyledBtn onClick={toggleButton} toggle={isSquad}>스쿼드</StyledBtn>
            <StyledBtn onClick={toggleButton} toggle={!isSquad}>경기</StyledBtn>
        </Wrapper>
        {isSquad ? <TeamSquad/> : <Fixtures/>}
    </>
  )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const StyledBtn =styled.button<{toggle:boolean}>`
    background-color: ${(props) => props.toggle ? 'lightblue' : 'aliceblue'};
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
`

export default TeamDetails
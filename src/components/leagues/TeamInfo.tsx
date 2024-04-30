import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getTeamInfo } from '../../apis/getLeagues'
import styled from 'styled-components'
import Stadium from '../../assets/stadium.png'
const TeamInfo = () => {
    const {teamid} = useParams()
    const {data:teamInfo, isLoading} = useQuery<any>({
        queryKey : ['info',teamid],
        queryFn : () => getTeamInfo(Number(teamid)),
    }) 
    
  return (
    <>
        {!isLoading &&
        <TeamInfoContainer>
            <TeamTitle>{teamInfo?.details.type}</TeamTitle>
            <InfoContainer $teamColor={teamInfo?.history.teamColor}>
                <TeamIogo src={teamInfo?.details.sportsTeamJSONLD.logo} alt="logo" width="30" height="30"/>
                <Info>
                    <h1>{teamInfo?.details.name}</h1>
                    <TeamCountry>
                        <img src={`https://images.fotmob.com/image_resources/logo/teamlogo/${teamInfo?.details.country.toLowerCase()}.png`} alt='logo' width={30} height={30}/>
                        <h3>{teamInfo?.details.country}</h3>
                    </TeamCountry>
                    <TeamCountry>
                        <img src={Stadium} alt='stadium' width={30} height={30}/>
                        <h3>{teamInfo?.details.sportsTeamJSONLD.location.name}</h3>
                    </TeamCountry>
                </Info>
            </InfoContainer>
        </TeamInfoContainer>
        }
    </>
  )
}
const TeamInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding : 10px;
  margin: 20px;
  border-radius: 10px;
  background-color: #1D1D1D;
  p,h2 {
    color : #fff;
  }
`;

const TeamTitle = styled.h2`
  margin-bottom: 10px;
`;

const InfoContainer = styled.div<{$teamColor:string}>`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 10px; 
  background-color: ${(props) => props.$teamColor};
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px; 
`;

const TeamIogo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  h1,h3 {
    color : #fff;
  }
`;
const TeamCountry = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    img {
        margin-right: 10px;
    }
`

export default TeamInfo
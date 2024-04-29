import React, {useState } from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { ISquad, Member } from '../../types/squad';
import { useQuery } from '@tanstack/react-query';
import { getSquad, getTeamInfo } from '../../apis/getLeagues';
import LoadingSpinner from '../../common/LoadingSpinner';


const TeamSquad = () => {
  const {teamid} = useParams()
  const [isModal,setIsModal] = useState(false);
  const [nowPlayer, setNowPlayer] = useState<Member>();
  const {data:teamSquad, isLoading} = useQuery<ISquad[]>({
    queryKey : ['squad',teamid],
    queryFn : () => getSquad(Number(teamid)),
  }) 
  const {data:teamInfo} = useQuery<any>({
    queryKey : ['info',teamid],
    queryFn : () => getTeamInfo(Number(teamid)),
  }) 
  console.log(teamInfo)

  const handleModal = (member:Member) => {
    setIsModal(prev => !prev)
    setNowPlayer(member)
  }
  return (
    <>
      {isModal && 
        <Modal>
          
        </Modal>
      }
      {isLoading && <LoadingSpinner/>}
        <SquadContainer>
            <SquadTitle>{teamInfo.type}</SquadTitle>
            <MemberContainer>
                <MemberImage src={teamInfo.sportsTeamJSONLD.logo} alt="logo" width="30" height="30"/>
                <MemberInfo>
                    <h2>{teamInfo.name}</h2>
                    <p>{teamInfo.country}</p>
                    <p>{teamInfo.sportsTeamJSONLD.location.name}</p>
                </MemberInfo>
            </MemberContainer>
        </SquadContainer>
      {teamSquad?.map((squad:ISquad, idx) => (
        <SquadContainer key={idx}>
          <SquadTitle>{squad.title}</SquadTitle>
          <SquadMembersContainer>
            {squad.members.map((member) => (
              <MemberContainer key={member.id} onClick ={() => handleModal(member)}>
                <MemberImage src={`https://images.fotmob.com/image_resources/playerimages/${member.id}.png`} alt='avatar'/>
                <MemberInfo>
                  <p>{member.name}</p>
                  <p>{member.cname}</p>
                </MemberInfo>
              </MemberContainer>
            ))}
          </SquadMembersContainer>  
        </SquadContainer>
      ))}
    </>
  )
}
const SquadContainer = styled.div`
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

const SquadTitle = styled.h2`
  margin-bottom: 10px;
`;

const SquadMembersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px; 
  margin-bottom: 20px; 
`;

const MemberContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 10px; 
  background-color: #272727;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px; 
`;

const MemberImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(94, 94, 94, 0.5);
  z-index: 999;
`;

export default TeamSquad
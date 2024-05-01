import React, {useState } from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { ISquad, Member } from '../../types/squad';
import { useQuery } from '@tanstack/react-query';
import { getSquad } from '../../apis/getLeagues';
import LoadingSpinner from '../../common/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { matchActions } from '../../store/matchSlice';
import { RootState } from '../../store/store';
import MemberDetail from './MemberDetail';
import { enTokrPosition } from '../../constants/translatePosition';


const TeamSquad = () => {
  const {teamid} = useParams()
  const dispatch = useDispatch();
  const {isModal} = useSelector((state:RootState) => state.matches)
  const [nowMember, setNowMember] = useState<Member>();
  const {data:teamSquad, isLoading} = useQuery<ISquad[]>({
    queryKey : ['squad',teamid],
    queryFn : () => getSquad(Number(teamid)),
  }) 

  const handleModal = (member:Member) => {
    dispatch(matchActions.setIsModal(!isModal))
    setNowMember(member)
  }

  const translatePosition = (title:string) => {
    return enTokrPosition[title]
  }
  
  return (
    <>
      {isLoading && <LoadingSpinner/>}
      {isModal && 
        <Modal>
          <MemberDetail member={nowMember!}/>
        </Modal>
      }
      {teamSquad?.map((squad:ISquad, idx) => (
        <SquadContainer key={idx}>
          <SquadTitle>{translatePosition(squad.title)}</SquadTitle>
          <SquadMembersContainer>
            {squad.members.map((member) => (
              <MemberContainer key={member.id} onClick ={() => handleModal(member)}>
                <MemberImage src={`https://images.fotmob.com/image_resources/playerimages/${member.id}.png`} alt='avatar'/>
                <MemberInfo>
                  <p>{member.name}</p>
                  <MemberCountry>
                    <img src={`https://images.fotmob.com/image_resources/logo/teamlogo/${member.ccode.toLowerCase()}.png`} alt='logo' width={20} height={20}/>
                    <p>{member.cname}</p>
                  </MemberCountry>
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
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #1D1D1D;
  
  @media (max-width: 768px) {
    margin: 10px;
    padding: 5px;
  }

  p,h2 {
    color: #fff;
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
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    overflow-x: auto;
    gap: 10px;
  }
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
  cursor: pointer;
`;

const MemberImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemberCountry = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
  }
`

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
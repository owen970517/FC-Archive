import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styled from 'styled-components';
import defaultImg from '../../assets/user.svg'
import { useQuery } from '@tanstack/react-query';
import { fetchUserData, fetchUserDivision } from '../../apis/getUserInfo';
import Title from '../../common/Title';

interface IUser {
    ouid : string;
    nickname : string;
    level : number;
}

interface IDivision {
    matchType : number;
    division : number;
    achievementDate : string;
}

const UserInfo = () => {
    const { ouid } = useSelector((state: RootState) => state.user);
    const [matchedType , setMatchedType] = useState<IDivision>()
    const [type, setType] = useState<number>(50);

    const {data:user} = useQuery<IUser>({
        queryKey : ['user', ouid],
        queryFn : () => fetchUserData(ouid)
    })

    const {data:division} = useQuery<IDivision[]>({
        queryKey : ['division', ouid],
        queryFn : () => fetchUserDivision(ouid)
    })

    const handleType = (e: React.MouseEvent<HTMLButtonElement>) => {
        setType(Number(e.currentTarget.value));
    };

    const getRankImageUrl = (divisionValue: number) => {
        return divisionValue < 2000 
            ? `https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank${Math.floor((divisionValue-800)/100)}.png`
            : `https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank${6+Math.floor((divisionValue-2000)/100)}.png`;
    };

    useEffect(() => {
        if (division && division.length > 0) {
            const now = division.find((d) => d.matchType === type)
            setMatchedType(now) 
        }
    },[division, type])
    return (
        <>
            <Title title={user?.nickname}/>
            <UserContainer>
                <User>
                    <ProfileImageWrapper>
                        <ProfileImg src={defaultImg} alt='user'/>
                    </ProfileImageWrapper>
                    <Info>
                        <h1>{user?.nickname}</h1>
                        <h3>레벨 {user?.level}</h3>
                    </Info>
                </User>
                <RankContainer>
                    <RankType>
                        <RankBtn $active={type === 50} onClick={(e) => handleType(e)} value={50}>공식 경기</RankBtn>
                        <RankBtn $active={type===52} onClick={(e) => handleType(e)} value={52}>감독 모드</RankBtn>
                    </RankType> 
                    <RankInfo>
                        <img src={matchedType ? getRankImageUrl(matchedType.division) : 'https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank_default.png'} alt='rank' width={80} height={80}/>
                        <h3>{matchedType ? `달성일: ${dayjs(matchedType.achievementDate).format('YYYY-MM-DD')}` : '최고 등급 기록 없음'}</h3>
                    </RankInfo>
                </RankContainer>
            </UserContainer>
        </>
    );
};

const UserContainer = styled.div`
    height: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const User = styled.div`
    display: flex;
    justify-content: center;
`
const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    float:left;
    margin-left: 10px;
`
const ProfileImageWrapper = styled.div`
  width: 150px;
  height : 150px;
  border-radius: 50%;
  overflow: hidden;
`
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const RankContainer = styled.div`
    display: flex;
    flex-direction:column;
`
const RankType = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`
const RankBtn = styled.button<{$active:boolean}>`
    padding: 10px 10px; 
    background-color: ${props => props.$active ? '#000': ''};
    color: ${props => props.$active ? 'var(--textDefault)': '#000'};
    font-weight: 600;
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #000; 
        color : var(--textDefault);
    }
`

const RankInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


export default UserInfo
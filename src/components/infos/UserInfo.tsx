import React, { useMemo, useState } from 'react'
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
    const [type, setType] = useState<number>(50);

    const {data:user} = useQuery<IUser>({
        queryKey : ['user', ouid],
        queryFn : () => fetchUserData(ouid),
        enabled : !!ouid
    })

    const {data:division} = useQuery<IDivision[]>({
        queryKey : ['division', ouid],
        queryFn : () => fetchUserDivision(ouid),     
        enabled : !!ouid   
    })

    const handleType = (e: React.MouseEvent<HTMLButtonElement>) => {
        setType(Number(e.currentTarget.value));
    };

    const getRankImageUrl = (divisionValue: number) => {
        return divisionValue < 2000 
            ? `https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank${Math.floor((divisionValue-800)/100)}.png`
            : `https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank${6+Math.floor((divisionValue-2000)/100)}.png`;
    };

    const matchedType = useMemo(() => division?.find((d) => d.matchType === type), [division, type]);
    
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

    @media (max-width: 768px) {
        height: auto;
    }
`
const User = styled.div`
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        align-items: center;
    }
`
const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    float: left;
    margin-left: 10px;

    @media (max-width: 768px) {
        justify-content: baseline;
        margin-left: 10px;
        h1 {
            font-size: 14px;
        }
        h3 {
            font-size: 12px;
        }
    }
`
const ProfileImageWrapper = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;

    @media (max-width: 768px) {
        width: 80px;
        height: 80px;
    }
`
const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const RankContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        align-items: center;
    }
`
const RankType = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        align-items: center;
        
    }
`
const RankBtn = styled.button<{$active: boolean}>`
    padding: 10px 10px; 
    background-color: ${props => props.$active ? '#000' : ''};
    color: ${props => props.$active ? 'var(--textDefault)' : '#000'};
    font-weight: 600;
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #000; 
        color: var(--textDefault);
    }

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 5px 5px;
    }
`

const RankInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        text-align: center;

        img {
            width: 40px;
            height: 40px;
        }
        h3 {
            font-size: 12px;
        }
    }   
`

export default UserInfo
import React, { useEffect, useState } from 'react'
import * as S from '../../styles/Formation.styled';
import { IPlayer } from '../../types/player';
import { position } from '../../constants/position';
import './bg.css';
import PlayerDetail from './PlayerDetail';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { matchActions } from '../../store/matchSlice';

interface ISpid {
  id : number;
  name:string;
}

const Formation = ({player}:{player:IPlayer[]}) => {
  const dispatch = useDispatch()
  const {isModal} = useSelector((state:RootState) => state.matches)
  const [nowformation,setNowFormation] = useState('');
  const [playerDetail, setPlayerDetail] = useState<IPlayer>();
  const [players,setPlayers] = useState<ISpid[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});  
  const starting = player.filter((d) => d.status.spRating > 0 && d.spPosition !== 28) 
  const starting_sort = starting.sort((a,b) => b.spPosition - a.spPosition)
  let maxRatingPlayer:IPlayer;
  if (starting_sort.length > 0) {
    maxRatingPlayer = starting_sort.reduce((prev, cur) => {
      return prev.status.spRating >= cur.status.spRating ? prev : cur;
    });
  }
  const playerInfo = starting_sort.map((d) => players.find((p) =>p.id === d.spId))
  const formation = starting_sort.map((s) => position[s.spPosition].desc)
  const playerDefaultImg = 'https://ssl.nexon.com/s2/game/fc/mobile/squadMaker/default/d_player.png'
  const playerClick = (idx:number) => {
    setNowFormation(formation[idx])
    setPlayerDetail(starting_sort[idx])
    setPlayerName(playerInfo[idx]!.name)
  }
  const handleModalOpen = () => {
    dispatch(matchActions.setIsModal(!isModal))
  }
  const handleModalClosed = (e:React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(matchActions.setIsModal(false));
    }
  };

  useEffect(() => {
    const initialUrls = starting_sort?.reduce((acc:any, cur) => {
      acc[cur.spId] = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${cur.spId}.png`;
      return acc;
    }, {});

    setImageUrls(initialUrls);
  }, []);

  useEffect(() => {
    const fetchPlayersData = async () => {
      try {
        const response = await fetch('/spid.json');
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayersData();
}, []);

  const handleImageError = (spId: number) => {
    const newUrl = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${Number(spId.toString().slice(3))}.png`;
    if (newUrl) {
      setImageUrls(prev => ({ ...prev, [spId]: newUrl }));
    } else {
      setImageUrls(prev => ({ ...prev, [spId]: playerDefaultImg }));
    }
  };

  if (!player || player.length === 0) {
    return <h1>기록이 존재하지 않습니다.</h1>
  }
  
  return (
    <>
      {isModal &&
        <Modal onClick={(e) => handleModalClosed(e)}>
          <PlayerDetail player={playerDetail!} formation={nowformation} name={playerName}/>
        </Modal>
      }
      <div className='image-bg'>
        {starting_sort.map((s, idx) => 
          <React.Fragment key={idx}>
            <S.Player className={`${formation[idx]}`} onClick={() => {playerClick(idx); handleModalOpen()}} >
              <S.PlayerImage
                src={imageUrls[s.spId]}
                onError={() => handleImageError(s.spId)}
              />
            </S.Player>
            <S.PlayerName className={formation[idx]}>{(playerInfo[idx]?.name.split(/[\s-]+/).pop())}</S.PlayerName>
            <S.PlayerRating $grade={starting_sort[idx].status.spRating} className={formation[idx]}>{starting_sort[idx].status.spRating.toFixed(1)} {starting_sort[idx].spId === maxRatingPlayer.spId && <span>⭐</span>}</S.PlayerRating>
          </React.Fragment>
        )}
      </div>
    </>
  )
}

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

export default Formation
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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

const playerDefaultImg = 'https://ssl.nexon.com/s2/game/fc/mobile/squadMaker/default/d_player.png'

const Formation = ({player}:{player:IPlayer[]}) => {
  const dispatch = useDispatch()
  const {isModal} = useSelector((state:RootState) => state.matches)
  const [nowformation,setNowFormation] = useState('');
  const [playerDetail, setPlayerDetail] = useState<IPlayer>();
  const [seasonplayers,setSeasonPlayers] = useState<ISpid[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});  
  const { starting_sort, maxRatingPlayer } = useMemo(() => {
    const filteredPlayers = player.filter((d) => d.status.spRating > 0 && d.spPosition !== 28);
    const sortedPlayers = filteredPlayers.sort((a,b) => b.spPosition - a.spPosition);
    
    let highestRatingPlayer: IPlayer | undefined = undefined;
    if (sortedPlayers.length > 0) {
      highestRatingPlayer = sortedPlayers.reduce((prev, cur) => {
        return prev.status.spRating >= cur.status.spRating ? prev : cur;
      });
    }
    return { starting: filteredPlayers, starting_sort: sortedPlayers, maxRatingPlayer: highestRatingPlayer };
  }, [player]);

  // playerInfo와 formation도 useMemo로 처리하여 안정적인 참조를 제공합니다.
  const playerInfo = useMemo(() => (
    starting_sort.map((d) => seasonplayers.find((p) => p.id === d.spId))
  ), [starting_sort, seasonplayers]);

  const formation = useMemo(() => (
    starting_sort.map((s) => position[s.spPosition]?.desc)
  ), [starting_sort]);
  // --- useMemo 훅 정의 끝 ---


  // --- useCallback 훅들을 정의 (이제 playerInfo, formation, starting_sort를 참조 가능) ---
  // useCallback으로 함수들을 감싸 불필요한 재생성을 방지합니다.
  const updateImageUrls = useCallback((players:IPlayer[]) => {
    const urlMap = players.reduce((acc: { [key: string]: string }, cur) => {
        acc[cur.spId] = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${cur.spId}.png`;
        return acc;
    }, {});
    setImageUrls(urlMap);
  }, []); // 이 함수는 외부 스코프의 변수를 사용하지 않으므로 의존성 배열을 비웁니다.

  const fetchPlayersData = useCallback(async () => {
    try {
      const response = await fetch('https://open.api.nexon.com/static/fconline/meta/spid.json');
      const data = await response.json();
      setSeasonPlayers(data);
    } catch (error) {
      console.error("Failed to fetch player data:", error);
    }
  }, []); // 이 함수는 외부 스코프의 변수를 사용하지 않으므로 의존성 배열을 비웁니다.

  const playerClick = useCallback((idx:number) => {
    // 이제 formation, playerInfo, starting_sort는 useMemo로 정의된 후이므로 참조 가능
    const currentFormation = formation[idx];
    const currentPlayerDetail = starting_sort[idx];
    const currentPlayerInfo = playerInfo[idx];

    if (currentFormation) setNowFormation(currentFormation);
    if (currentPlayerDetail) setPlayerDetail(currentPlayerDetail);
    if (currentPlayerInfo) setPlayerName(currentPlayerInfo.name); // .name 속성에 안전하게 접근
  }, [formation, playerInfo, starting_sort]); // 관련 배열/객체가 변경될 때만 재생성

  const handleModalOpen = useCallback(() => {
    dispatch(matchActions.setIsModal(!isModal));
  }, [dispatch, isModal]);

  const handleModalClosed = useCallback((e:React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(matchActions.setIsModal(false));
    }
  }, [dispatch]);

  const handleImageError = useCallback((spId: number) => {
    const spIdStr = String(spId);
    const croppedSpId = spIdStr.length > 3 ? spIdStr.slice(3) : spIdStr;
    const newUrl = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${croppedSpId}.png`;
    setImageUrls(prev => ({ ...prev, [spId]: newUrl ? newUrl : playerDefaultImg }));
  }, []); // 이 함수는 외부 스코프의 변수를 사용하지 않으므로 의존성 배열을 비웁니다.
  // --- useCallback 훅 정의 끝 ---


  // --- useEffect 훅들을 정의 ---
  // 컴포넌트 마운트 시 데이터 fetch
  useEffect(() => {
    fetchPlayersData();
  }, [fetchPlayersData]); // useCallback으로 감싼 fetchPlayersData를 의존성으로 넣습니다.

  // starting_sort나 seasonplayers가 변경될 때 imageUrls 업데이트
  useEffect(() => {
    // player가 로드되었고 seasonplayers가 비어있지 않으면 실행
    if (starting_sort.length > 0 && seasonplayers.length > 0) {
      updateImageUrls(starting_sort);
    }
  }, [starting_sort, seasonplayers, updateImageUrls]); // 모든 의존성을 명시합니다.
  // --- useEffect 훅 정의 끝 ---


  if (!player || player.length === 0) {
    return <h1>기록이 존재하지 않습니다.</h1>
  }
  
  return (
    <>
      {isModal && playerDetail && // playerDetail이 존재할 때만 모달 렌더링
        <Modal onClick={handleModalClosed}> {/* useCallback으로 감쌌으니 직접 전달 */}
          <PlayerDetail player={playerDetail} formation={nowformation} name={playerName}/>
        </Modal>
      }
      <div className='image-bg'>
        {starting_sort.map((s, idx) => 
          <React.Fragment key={s.spId}> {/* key는 고유한 값인 spId를 사용하는 것이 더 좋습니다 */}
            <S.Player className={`${formation[idx] || ''}`} onClick={() => {playerClick(idx); handleModalOpen();}}> {/* formation[idx]가 undefined일 경우 빈 문자열 */}
              <S.PlayerImage
                src={imageUrls[s.spId]}
                onError={() => handleImageError(s.spId)}
              />
            </S.Player>
            <S.PlayerName className={formation[idx] || ''}>
              {(playerInfo[idx]?.name.split(/[\s-]+/).pop())}
            </S.PlayerName>
            <S.PlayerRating $grade={s.status.spRating} className={formation[idx] || ''}>
              {s.status.spRating.toFixed(1)} 
              {maxRatingPlayer && s.spId === maxRatingPlayer.spId && <span>⭐</span >}
            </S.PlayerRating>
          </React.Fragment>
        )}
      </div>
    </>
  );
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
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { IMatchInfo } from '../../types/matchInfo'
import MatchDetail from './MatchDetail'
import AddMoreBtn from './AddMoreBtn';
import MatchListItem from './MatchListItem';

interface InfiniteQueryProps {
  fetchNextPage : () => void;
  hasNextPage : boolean;
  isFetchingNextPage : boolean
}

const MatchList = ({ fetchNextPage, hasNextPage, isFetchingNextPage }:InfiniteQueryProps) => {
  
  const {allMatchInfo,openList} = useSelector((state:RootState) => state.matches)
 
  return (
    <>
      {
        allMatchInfo.map((match: IMatchInfo, idx) => {
          let isLast = idx === allMatchInfo.length - 1;
          return (
            <React.Fragment key={idx}>
              <MatchListItem match={match}/>
              <CSSTransition
                in={openList.includes(match.matchId)}
                timeout={300}
                classNames="detail"
                unmountOnExit
              >
                <MatchDetailWrapper>
                  <MatchDetail match={match} />
                </MatchDetailWrapper>
              </CSSTransition>
              <AddMoreBtn
                isLast={isLast}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </React.Fragment>
          )
        })}
    </>
  )
}

const MatchDetailWrapper = styled.div`
  &.detail-enter {
    opacity: 0;
    max-height: 0;
  }
  &.detail-enter-active {
    opacity: 1;
    max-height: 500px; /* 원하는 최종 높이 설정 */
    transition: opacity 300ms, max-height 300ms;
  }
  &.detail-exit {
    opacity: 1;
    max-height: 500px;
  }
  &.detail-exit-active {
    opacity: 0;
    max-height: 0;
    transition: opacity 300ms, max-height 300ms;
  }
`;

export default MatchList
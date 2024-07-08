import React from 'react'
import styled from 'styled-components'
import LoadingSpinner from '../../common/LoadingSpinner';

interface InfiniteQueryProps {
    isLast : boolean;
    fetchNextPage : () => void;
    hasNextPage : boolean;
    isFetchingNextPage : boolean
}

const AddMoreBtn = ({ isLast, fetchNextPage, hasNextPage, isFetchingNextPage }:InfiniteQueryProps) => {
  return (
    <>
        {isLast && hasNextPage && (
            <ButtonWrapper>
            {isFetchingNextPage ? (
                <LoadingSpinner/>
            ) : (
                <MoreButton onClick={() => fetchNextPage()}>더 보기</MoreButton>
            )}
            </ButtonWrapper>
        )}
    </>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const MoreButton = styled.button`
  width: 80%;
  border-radius: 5px;
  font-size: 16px;
  padding : 10px;
  border: none;
  cursor: pointer;
`

export default AddMoreBtn
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { matchActions } from '../store/matchSlice';
import { RootState } from '../store/store';
import { matchtype } from '../constants/metadata';
import { IMatch } from '../types/matchtype';
import styled from 'styled-components';

const MatchType = () => {
    const dispatch = useDispatch()
    const {type} = useSelector((state:RootState) => state.matches)
    const handleMatchType = (e:React.MouseEvent<HTMLButtonElement>) => {
        dispatch(matchActions.initState());
        dispatch(matchActions.setType(Number(e.currentTarget.value)))
    }

  return (
    <TypeContainer>
        {matchtype.map((match:IMatch,idx) => (
            <Button $active={type === match.value} key={idx} value={match.value} onClick={(e) => handleMatchType(e)}>{match.name}</Button>
        ))}
    </TypeContainer>
  )
}

const TypeContainer = styled.div`
    display: flex;
    width : 80%;
    margin: 0 auto;
`

const Button = styled.button<{$active:boolean}>`
    color: '#333';
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    font-size: 20px;
    cursor: pointer;
    background: none;
    position: relative;
    transition: color 0.2s ease;

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: ${props => props.$active ? '100%' : '0'};
        height: 2px;
        background-color: var(--textDefault);
        transition: width 0.2s ease;
    }

    &:hover {
        &:after {
            width: 100%;
        }
    }
`
export default MatchType
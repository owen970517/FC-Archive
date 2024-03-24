import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { IForm } from '../types/form';
import { userActions } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '../assets/SearchIcon';
import { matchActions } from '../store/matchSlice';
import LatestName from './LatestName';
import useKeyboard from '../hooks/useKeyboard';

const UserInput = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue } = useForm<IForm>();
  const user = watch('user');
  const nav = useNavigate();
  const [isFocus,setIsFocus] = useState(false);
  const prevSearched:string[] = JSON.parse(localStorage.getItem('searched') || '[]')
  const {keyBoardIdx,onKeydown,initIndex} = useKeyboard(prevSearched)

  useEffect(() => {
    if (keyBoardIdx !== null) {
      const selectedName = prevSearched[keyBoardIdx];
      setValue('user', selectedName);
    } else {
      setValue('user' , '')
    }
  }, [keyBoardIdx]);

  const fetchUserId = async (nickname:string) => {
    try {
      const urlString = `https://open.api.nexon.com/fconline/v1/id?nickname=${nickname}`;
      const response = await fetch(urlString, {
        headers: {
          "x-nxopen-api-key": process.env.REACT_APP_API_KEY ?? "",
        }
      });

      if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');

      const data = await response.json();
      dispatch(userActions.setOuid(data.ouid));
      nav(`/search?nickname=${nickname}`);
    } catch (error) {
      console.error('사용자 ID를 가져오는 데 실패:', error);
    }
  };

  const onSubmit = async () => {
    dispatch(matchActions.initState());
    await fetchUserId(user);
    setValue('user', '');
    initIndex();
    const updatedData = prevSearched.filter((data:string) => data !== user);
    updatedData.unshift(user);
    if (updatedData.length > 5) {
      updatedData.pop();
    }
    localStorage.setItem('searched', JSON.stringify(updatedData));
  };
  
  const handleInput = (e: React.KeyboardEvent) => {
    onKeydown(e)
  }
  useEffect(() => {
    if (!isFocus) {
      initIndex();
    }
    initIndex();
  },[initIndex, isFocus])
  
  return (
    <SearchContainer>
      <SearchBar onSubmit={handleSubmit(onSubmit)}>
        <input 
          {...register('user', {required:true})} 
          type='text' 
          autoComplete='off' 
          placeholder='구단주 명을 입력하시오'
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onKeyDown={(e) => handleInput(e)}
        />
        <button type='submit'>
          <SearchIcon size={21}/>
        </button>
      </SearchBar>
      {isFocus && <LatestName nowIdx={keyBoardIdx!} fetchUserId={fetchUserId}/>}
    </SearchContainer>
  )
}
const SearchContainer = styled.div`
  position: relative;
`

const SearchBar = styled.form`
  width: 490px;
  height: 75px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 10px 25px;
  border-radius: 50px;
  border: 1px solid black;
  box-sizing: border-box;

  & > svg {
    color: gray;
    flex: none;
  }

  input {
    width: 100%;
    border: none;
    margin-left: 10px;
    font-size: 17px;
    outline: none;
  }
  button {
    color: #ffffff;
    background-color: #007be9;
    border: 0;
    cursor: pointer;
    border-radius: 100%;
    width: 55px;
    height: 48px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
`;
export default UserInput
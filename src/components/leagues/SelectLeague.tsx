import React from 'react'
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { leagues } from '../../constants/leagues';

const SelectLeague = ({ setNowId }: { setNowId: (id: number) => void}) => {
  const {register} = useForm();
  const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setNowId(Number(e.target.value))
  }
  return (
    <Wrapper>
      <StyledSelect {...register('league' ,{required : true})} onChange={handleSelect} >
        {leagues.map((data) => (
          <option key={data.id} value={data.id}>{data.name}</option>
        ))}
      </StyledSelect>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`

const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  &:hover {
    border-color: #888;
  }
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
    outline: none;
  }
`;

export default SelectLeague
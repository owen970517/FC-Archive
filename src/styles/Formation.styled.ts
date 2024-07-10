import styled from "styled-components";

export const Field = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 700px;
    height: 700px;
    position: relative;
    margin : 0 auto;
    border-radius: 10px;
    @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`

export const Player = styled.div`
    z-index:0;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: #fff;
    font-weight: bold;
    overflow: hidden;
    cursor: pointer;
    :hover {
        transform: scale(1.1);
    }
    &.ST { top: 10%; left: 50%; transform: translate(-50%, -50%); }
    &.LS { top: 10%; left: 30%; transform: translate(-50%, -50%); }
    &.RS { top: 10%; left: 70%; transform: translate(-50%, -50%); }
    &.LF { top:25%; left: 35%; transform: translate(-50%, -50%); }
    &.RF { top:25%; left: 65%; transform: translate(-50%, -50%); }
    &.CF { top:25%; left: 50%; transform: translate(-50%, -50%); }
    &.LW { top: 35%; left: 10%; transform: translate(-50%, -50%); }
    &.RW { top: 35%; left: 90%; transform: translate(-50%, -50%); }
    &.LAM { top: 35%; left: 30%; transform: translate(-50%, -50%); }
    &.CAM { top: 35%; left: 50%; transform: translate(-50%, -50%); }
    &.RAM { top: 35%; left: 70%; transform: translate(-50%, -50%); }
    &.RM { top: 50%; left: 90%; transform: translate(-50%, -50%); }
    &.LM { top: 50%; left: 10%; transform: translate(-50%, -50%); }
    &.CM { top: 50%; left: 50%; transform: translate(-50%, -50%); }
    &.LCM { top: 50%; left: 30%; transform: translate(-50%, -50%); }
    &.RCM { top: 50%; left: 70%; transform: translate(-50%, -50%); }
    &.CDM { top: 65%; left: 50%; transform: translate(-50%, -50%); }
    &.LDM { top: 65%; left: 30%; transform: translate(-50%, -50%); }
    &.RDM { top: 65%; left: 70%; transform: translate(-50%, -50%); }
    &.LWB { top: 65%; left: 10%; transform: translate(-50%, -50%); }
    &.RWB { top: 65%; left: 90%; transform: translate(-50%, -50%); }
    &.LCB { top: 80%; left: 30%; transform: translate(-50%, -50%); }
    &.RCB { top: 80%; left: 70%; transform: translate(-50%, -50%); }
    &.CB { top: 80%; left: 50%; transform: translate(-50%, -50%); }
    &.LB { top: 80%; left: 10%; transform: translate(-50%, -50%); }
    &.RB { top: 80%; left: 90%; transform: translate(-50%, -50%); }
    &.GK { bottom :0; left:50%; transform:translate(-50%,-50%);}

    @media (max-width: 768px) {
    width: 50px;
    height: 50px;

    &.ST { top: 8%; left: 50%; }
    &.LS { top: 8%; left: 30%; }
    &.RS { top: 8%; left: 70%; }
    &.LF { top: 20%; left: 35%; }
    &.RF { top: 20%; left: 65%; }
    &.CF { top: 20%; left: 50%; }
    &.LW { top: 30%; left: 10%; }
    &.RW { top: 30%; left: 90%; }
    &.LAM { top: 30%; left: 30%; }
    &.CAM { top: 30%; left: 50%; }
    &.RAM { top: 30%; left: 70%; }
    &.RM { top: 45%; left: 90%; }
    &.LM { top: 45%; left: 10%; }
    &.CM { top: 45%; left: 50%; }
    &.LCM { top: 45%; left: 30%; }
    &.RCM { top: 45%; left: 70%; }
    &.CDM { top: 60%; left: 50%; }
    &.LDM { top: 60%; left: 30%; }
    &.RDM { top: 60%; left: 70%; }
    &.LWB { top: 60%; left: 10%; }
    &.RWB { top: 60%; left: 90%; }
    &.LCB { top: 75%; left: 30%; }
    &.RCB { top: 75%; left: 70%; }
    &.CB { top: 75%; left: 50%; }
    &.LB { top: 75%; left: 10%; }
    &.RB { top: 75%; left: 90%; }
    &.GK { bottom: 4%; left: 50%; }
  }
`

export const PlayerImage = styled.img`
    width : 100%;
    height: 100%;
    object-fit: cover;
`

export const PlayerName = styled.span`
  position: absolute;
  color: var(--nameColor);
  font-size: 14px;
  font-weight: 800;

  &.ST { top: 16%; left: 50%; transform: translate(-50%, -50%); }
  &.LS { top: 16%; left: 30%; transform: translate(-50%, -50%); }
  &.RS { top: 16%; left: 70%; transform: translate(-50%, -50%); }
  &.LF { top: 31%; left: 35%; transform: translate(-50%, -50%); }
  &.RF { top: 31%; left: 65%; transform: translate(-50%, -50%); }
  &.CF { top: 31%; left: 50%; transform: translate(-50%, -50%); }
  &.LW { top: 41%; left: 10%; transform: translate(-50%, -50%); }
  &.RW { top: 41%; left: 90%; transform: translate(-50%, -50%); }
  &.LAM { top: 41%; left: 30%; transform: translate(-50%, -50%); }
  &.CAM { top: 41%; left: 50%; transform: translate(-50%, -50%); }
  &.RAM { top: 41%; left: 70%; transform: translate(-50%, -50%); }
  &.RM { top: 56%; left: 90%; transform: translate(-50%, -50%); }
  &.LM { top: 56%; left: 10%; transform: translate(-50%, -50%); }
  &.CM { top: 56%; left: 50%; transform: translate(-50%, -50%); }
  &.LCM { top: 56%; left: 30%; transform: translate(-50%, -50%); }
  &.RCM { top: 56%; left: 70%; transform: translate(-50%, -50%); }
  &.CDM { top: 71%; left: 50%; transform: translate(-50%, -50%); }
  &.LDM { top: 71%; left: 30%; transform: translate(-50%, -50%); }
  &.RDM { top: 71%; left: 70%; transform: translate(-50%, -50%); }
  &.LWB { top: 71%; left: 10%; transform: translate(-50%, -50%); }
  &.RWB { top: 71%; left: 90%; transform: translate(-50%, -50%); }
  &.LCB { top: 86%; left: 30%; transform: translate(-50%, -50%); }
  &.RCB { top: 86%; left: 70%; transform: translate(-50%, -50%); }
  &.CB { top: 86%; left: 50%; transform: translate(-50%, -50%); }
  &.LB { top: 86%; left: 10%; transform: translate(-50%, -50%); }
  &.RB { top: 86%; left: 90%; transform: translate(-50%, -50%); }
  &.GK { bottom: 2%; left: 50%; transform: translate(-50%, 50%); }

  @media (max-width: 768px) {
    font-size: 13px;
    font-weight: 800;
    &.ST { top: 13%; left: 50%; }
    &.LS { top: 13%; left: 30%; }
    &.RS { top: 13%; left: 70%; }
    &.LF { top: 25%; left: 35%; }
    &.RF { top: 25%; left: 65%; }
    &.CF { top: 25%; left: 50%; }
    &.LW { top: 35%; left: 10%; }
    &.RW { top: 35%; left: 90%; }
    &.LAM { top: 35%; left: 30%; }
    &.CAM { top: 35%; left: 50%; }
    &.RAM { top: 35%; left: 70%; }
    &.RM { top: 50%; left: 90%; }
    &.LM { top: 50%; left: 10%; }
    &.CM { top: 50%; left: 50%; }
    &.LCM { top: 50%; left: 30%; }
    &.RCM { top: 50%; left: 70%; }
    &.CDM { top: 65%; left: 50%; }
    &.LDM { top: 65%; left: 30%; }
    &.RDM { top: 65%; left: 70%; }
    &.LWB { top: 65%; left: 10%; }
    &.RWB { top: 65%; left: 90%; }
    &.LCB { top: 81%; left: 30%; }
    &.RCB { top: 81%; left: 70%; }
    &.CB { top: 81%; left: 50%; }
    &.LB { top: 81%; left: 10%; }
    &.RB { top: 81%; left: 90%; }
    &.GK { bottom: 5%; left: 50%; }
  }
`;

export const PlayerRating = styled.span<{$grade:number}>`
  z-index: 10;
  position: absolute;
  color: #fff;
  background-color: ${({ $grade }) => {
    if ($grade >= 2 && $grade <= 4) {
      return 'rgb(229, 94, 91)'; 
    } else if ($grade >= 5 && $grade < 6) {
      return 'rgb(240, 128, 34)';
    } else if ($grade >= 6 && $grade < 9) {
      return 'rgb(30, 200, 83)'; 
    } else if ($grade >= 9) {
      return 'rgba(14, 135, 224, 1.0)'; 
    } else {
      return 'rgb(73, 80, 87)'; 
    }
  }};
  border-radius: 10px;
  padding: 5px;
  font-size: 12px;

  &.ST { top: 4%; left: 51%; }
  &.LS { top: 4%; left: 31%; }
  &.RS { top: 4%; left: 71%; }
  &.LF { top: 19%; left: 37%; }
  &.RF { top: 19%; left: 67%; }
  &.CF { top: 19%; left: 51%; }
  &.LW { top: 29%; left: 11%; }
  &.RW { top: 29%; left: 91%; }
  &.LAM { top: 29%; left: 31%; }
  &.CAM { top: 29%; left: 51%; }
  &.RAM { top: 29%; left: 71%; }
  &.RM { top: 44%; left: 11%; }
  &.LM { top: 44%; left: 91%; }
  &.CM { top: 44%; left: 51%; }
  &.LCM { top: 44%; left: 31%; }
  &.RCM { top: 44%; left: 71%; }
  &.CDM { top: 59%; left: 51%; }
  &.LDM { top: 59%; left: 31%; }
  &.RDM { top: 59%; left: 71%; }
  &.LWB { top: 59%; left: 11%; }
  &.RWB { top: 59%; left: 91%; }
  &.LCB { top: 74%; left: 31%; }
  &.RCB { top: 74%; left: 71%; }
  &.CB { top: 74%; left: 51%; }
  &.LB { top: 74%; left: 11%; }
  &.RB { top: 74%; left: 91%; }
  &.GK { bottom: 10%; left: 52%; }
  @media (max-width:768px) {
    &.ST { top: 3%; left: 53%; }
    &.LS { top: 3%; left: 33%; }
    &.RS { top: 3%; left: 73%; }
    &.LF { top: 14%; left: 37%; }
    &.RF { top: 14%; left: 67%; }
    &.CF { top: 14%; left: 51%; }
    &.LW { top: 24%; left: 12%; }
    &.RW { top: 24%; left: 92%; }
    &.LAM { top: 24%; left: 32%; }
    &.CAM { top: 24%; left: 52%; }
    &.RAM { top: 24%; left: 72%; }
    &.RM { top: 39%; left: 12%; }
    &.LM { top: 39%; left: 92%; }
    &.CM { top: 39%; left: 52%; }
    &.LCM { top: 39%; left: 32%; }
    &.RCM { top: 39%; left: 72%; }
    &.CDM { top: 54%; left: 52%; }
    &.LDM { top: 54%; left: 32%; }
    &.RDM { top: 54%; left: 72%; }
    &.LWB { top: 54%; left: 12%; }
    &.RWB { top: 54%; left: 92%; }
    &.LCB { top: 70%; left: 32%; }
    &.RCB { top: 70%; left: 72%; }
    &.CB { top: 70%; left: 52%; }
    &.LB { top: 70%; left: 12%; }
    &.RB { top: 70%; left: 92%; }
    &.GK { bottom: 13%; left: 52%; }
  }
`
import { createSlice } from '@reduxjs/toolkit';
import { IMatchInfo } from '../types/matchInfo';

interface IMatchState {
    isFocus: boolean;
    isModal: boolean;
    type: number;
    allMatchId: string[];
    allMatchInfo: IMatchInfo[];
    openList: string[];
}

const initialMatchState:IMatchState = {
    isFocus : false,
    isModal :false,
    type :50,
    allMatchId : [],
    allMatchInfo : [],
    openList : []
}

const matchSlice = createSlice({
    name : 'match',
    initialState : initialMatchState,
    reducers : {
        initState(state) {
            state.type=50
            state.isFocus = false
            state.allMatchId=[]
            state.allMatchInfo=[]
            state.openList = []
        },
        setIsFocus(state,action) {
            state.isFocus = action.payload
        },
        setIsModal(state,action) {
            state.isModal = action.payload
        },
        setType(state,action) {
            state.type = action.payload
        },
        setAllMatchId(state,action) {
            state.allMatchId = action.payload
        },
        setAllMatchInfo(state, action) {
            state.allMatchInfo = [...state.allMatchInfo, ...action.payload];
        },
        setHandleOpen(state,action) {
            if (state.openList.includes(action.payload)) {
                const newList = state.openList.filter((k) => k !== action.payload)
                state.openList = newList
            } else {
                state.openList = [...state.openList,action.payload]
            }
        }
    }
})

export const matchActions = matchSlice.actions
export default matchSlice.reducer
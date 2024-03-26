import { createSlice } from '@reduxjs/toolkit';
import { IMatchInfo } from '../types/matchInfo';

interface IMatchState {
    offset: number;
    isFocus: boolean;
    isModal: boolean;
    isLoading: boolean;
    isLoadingMore: boolean;
    isLoadingType : boolean;
    type: number;
    allMatchId: string[];
    allMatchInfo: IMatchInfo[];
    openList: string[];
}

const initialMatchState:IMatchState = {
    offset : 0,
    isFocus : false,
    isModal :false,
    isLoading : true,
    isLoadingMore : false,
    isLoadingType : false,
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
            state.offset = 0
            state.type=50
            state.isFocus = false
            state.allMatchId=[]
            state.allMatchInfo=[]
            state.openList = []
        },
        setOffset(state,action) {
            state.offset = action.payload
        },
        setIsLoading(state,action) {
            state.isLoading = action.payload
        },
        setIsFocus(state,action) {
            state.isFocus = action.payload
        },
        setIsLoadingMore(state,action) {
            state.isLoadingMore = action.payload
        },
        setIsLoadingType(state,action) {
            state.isLoadingType = action.payload
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
            const newMatchInfo = action.payload.filter((newMatch: IMatchInfo) => 
                !state.allMatchInfo.some(existingMatch => 
                    existingMatch.matchId === newMatch.matchId
                )
            );
            state.allMatchInfo = [...state.allMatchInfo, ...newMatchInfo];
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
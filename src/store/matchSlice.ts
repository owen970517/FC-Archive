import { createSlice } from '@reduxjs/toolkit';
import { IMatchInfo } from '../types/matchInfo';

const initialMatchState = {
    offset : 0,
    isModal :false,
    isLoading : true,
    isLoadingMore : false,
    type :50,
    allMatchId : [] as string[],
    allMatchInfo : [] as IMatchInfo[],
    openList : [] as string[]
}

const matchSlice = createSlice({
    name : 'match',
    initialState : initialMatchState,
    reducers : {
        initState(state) {
            state.offset = 0
            state.isLoading = true
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
        setIsLoadingMore(state,action) {
            state.isLoadingMore = action.payload
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
            if (action.payload.length > 0) {
                const newMatchInfo = action.payload.filter((newMatch:IMatchInfo) => 
                    !state.allMatchInfo.some(existingMatch => 
                        existingMatch.matchId === newMatch.matchId
                    )
                );
                state.allMatchInfo = [...state.allMatchInfo, ...newMatchInfo];
            }
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
import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    ouid : '',
}

const userSlice = createSlice({
    name : 'user',
    initialState :initialUserState ,
    reducers : {
        setOuid(state,action) {
            state.ouid = action.payload
        },
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer
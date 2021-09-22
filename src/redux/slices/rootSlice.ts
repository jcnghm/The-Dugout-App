import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Clayton Kershaw',

    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName,} = rootSlice.actions;
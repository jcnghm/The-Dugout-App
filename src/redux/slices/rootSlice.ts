import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Clayton Kershaw',
        team: 'Los Angeles Dodgers',
        league: 'National League',
        position: 'Pitcher',
        rating: '93'
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseTeam: (state, action) => { state.team = action.payload },
        chooseLeague: (state, action) => { state.league = action.payload },
        choosePosition: (state, action) => { state.position = action.payload },
        chooseRating: (state, action) => { state.rating = action.payload },
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName } = rootSlice.actions;
export const { chooseTeam } = rootSlice.actions;
export const { chooseLeague } = rootSlice.actions;
export const { choosePosition } = rootSlice.actions;
export const { chooseRating } = rootSlice.actions;
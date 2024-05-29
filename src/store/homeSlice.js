import { createSlice } from '@reduxjs/toolkit'



export const homeSlice = createSlice({
  name: 'home',
  initialState : {
    coinData: [],
    currency: {
      name: 'USD',
      Symbol: '$'
    }
  },
  reducers: {
    setCoinData: (state, action) => {
      state.coinData = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    }
 
  },
})

// Action creators are generated for each case reducer function
export const { setCoinData, setCurrency } = homeSlice.actions

export default homeSlice.reducer
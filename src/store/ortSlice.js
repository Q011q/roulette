import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',          
  points: 0,         
  isSpinning: false,
  status: 'applicant',
  hasApplication: false, 
  applicationData: null, // Добавили хранилище для данных заявки
};

const ortSlice = createSlice({
  name: 'ort',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.points = action.payload.points;
      state.status = 'applicant';
    },
    updateUserName: (state, action) => {
      state.user = action.payload;
    },
    // Улучшенный CREATE: сохраняем данные формы
    submitApplication: (state, action) => {
      state.hasApplication = true;
      state.applicationData = action.payload; // { faculty, phone, motivation }
    },
    // Улучшенный DELETE: очищаем данные
    removeApplication: (state) => {
      state.hasApplication = false;
      state.applicationData = null;
    },
    startSpin: (state) => {
      if (state.points >= 10) {
        state.points -= 10;
        state.isSpinning = true;
      }
    },
    endSpin: (state, action) => {
      const { points_change, new_status } = action.payload;
      state.points += points_change;
      state.isSpinning = false;
      if (new_status) state.status = new_status;
    }
  },
});

export const { setUser, updateUserName, submitApplication, removeApplication, startSpin, endSpin } = ortSlice.actions;
export default ortSlice.reducer;
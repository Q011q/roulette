import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',          // Имя пользователя
  points: 0,         // Баллы ОРТ
  isSpinning: false,
  status: 'applicant',
  hasApplication: false, // Статус стандартной заявки
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
    // UPDATE: Обновление имени
    updateUserName: (state, action) => {
      state.user = action.payload;
    },
    // CREATE/DELETE заявку:
    setApplicationStatus: (state, action) => {
      state.hasApplication = action.payload;
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

export const { setUser, updateUserName, setApplicationStatus, startSpin, endSpin } = ortSlice.actions;
export default ortSlice.reducer;
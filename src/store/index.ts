import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from '../redux/features/vehiclesSlice';

const store = configureStore({
    reducer: {
        vehicles: vehiclesReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

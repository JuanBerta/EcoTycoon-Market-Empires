import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Importaremos los reducers a medida que los creemos
// import economyReducer from './slices/economySlice';
// import entitiesReducer from './slices/entitiesSlice';
// import gameStateReducer from './slices/gameStateSlice';

export const store = configureStore({
  reducer: {
    // economy: economyReducer,
    // entities: entitiesReducer,
    // gameState: gameStateReducer,
  },
});

// Tipos para useDispatch y useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks tipados
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

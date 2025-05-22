"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppSelector = exports.useAppDispatch = exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const react_redux_1 = require("react-redux");
// Importaremos los reducers a medida que los creemos
// import economyReducer from './slices/economySlice';
// import entitiesReducer from './slices/entitiesSlice';
// import gameStateReducer from './slices/gameStateSlice';
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
    // economy: economyReducer,
    // entities: entitiesReducer,
    // gameState: gameStateReducer,
    },
});
// Hooks tipados
const useAppDispatch = () => (0, react_redux_1.useDispatch)();
exports.useAppDispatch = useAppDispatch;
exports.useAppSelector = react_redux_1.useSelector;

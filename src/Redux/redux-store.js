import {createStore, applyMiddleware} from 'redux';
import paletteReducer from './palette-reducer';
import logger from 'redux-logger';

// const rootReducer= combineReducers({palettes: paletteReducer})

// const middlewares = [logger]

// if(process.env.NODE_ENV === 'development') {
//     middlewares.push(logger)
// }

const store= createStore(paletteReducer, applyMiddleware(logger))

export default store;
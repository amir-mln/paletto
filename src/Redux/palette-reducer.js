import generatePalette from '../Utilities/colorHelpers';
import seedPalette from '../seedPalettes';

const INITIAL_STATE= {
    palettes: seedPalette.map((p)=> generatePalette(p))
};

const paletteReducer= (state=INITIAL_STATE, action)=>{
    const {type, payload}= action;
    const {palettes}= state;
    switch(type){
        case 'ADD_PALETTE': 
            return {
                ...state,
                palettes: [...palettes, payload]
            }
        default: return state
    }
}

export default paletteReducer;
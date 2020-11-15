import React, {useState, useRef} from 'react';
import { connect } from 'react-redux';
import ColorBox from '../color-box/color-box-componenet';
import PaletteHeader from '../palette-header/palette-header-component';
import './palette-component.scss';

const Palette =({match, history, palettes, showShadesPalette, showShadesRange})=>{
    const [colorShade, setShade] =useState(500);
    const [colorMode, setColorMode] =useState('hex');
    const snackbarRef= useRef(null);

    const handleColorMode= (color)=>{
        setColorMode(color);
        snackbarRef.current.classList.add("show");
        setTimeout(()=> snackbarRef.current.classList.remove("show"), 3000)
    }

    const {paletteName, emoji, colors, id}= palettes.find((palette)=> palette.id === match.params.paletteId)
    const shades = [];
    if(showShadesPalette){
        Object.values(colors).forEach((colorGroup)=> {
            colorGroup.forEach( color => { if(color.id === match.params.colorId) shades.push(color) }  );
        })
    }

    return(
        <div className="palette">
            <header>
                    <PaletteHeader 
                        colorMode={colorMode} 
                        handleColorMode={handleColorMode} 
                        colorShade={colorShade}
                        setShade={setShade}
                        showShadesRange={showShadesRange}
                    />
            </header>
            <div className="palette-colors">
                {
                    showShadesPalette?
                    shades.map((color, index)=> 
                        index === 0 ?
                        <div className="go-back-to-palette" key={index}>
                            <button type="button" onClick={()=> history.goBack()}>go back</button>
                        </div>
                        :
                        <ColorBox 
                            showMore={false} 
                            inputWidth="20%"
                            inputHeight="50%"
                            colorName={color.name}
                            colorValue={color[colorMode]}
                            key={index} 
                        />
                    )
                    : 
                    colors[colorShade].map( ( color )=> 
                        <ColorBox 
                            paletteId={id}
                            colorId={color.id}
                            colorValue={color[colorMode]} 
                            colorName={color.name}
                            showMore={true} 
                            inputHeight="25%"
                            inputWidth="20%"
                            key={color.hex}
                        /> 
                    )
                }
            </div>
            <footer>
                <span>{paletteName} {emoji}</span>
                <div className="snackbar" ref={snackbarRef} >{colorMode} is selected</div>
            </footer>
        </div>
    )
}


const mapStateToProps= (state)=>({
    palettes: state.palettes
});

export default connect(mapStateToProps)(Palette);
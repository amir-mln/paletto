import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import {addPalette} from '../../Redux/palette-actions';
import {ReactComponent as PIcon} from '../../Assets/icon-painter.svg';
import {ReactComponent as RemoveIcon} from '../../Assets/icon-remove.svg';
import generatePalette from '../../Utilities/colorHelpers';
import chroma from 'chroma-js';

import './new-palette-component.scss'


const NewPalette= ({history, palettes, dispatch})=> {
    const [navStatus, setStatus]= useState(false);
    const [textColor, setTextColor]= useState("white");

    const [paletteName, setPaletteName]= useState('') ;
    const [colorName, setColorName]= useState('');
    const [selectedColor, setColorObject]= useState("#ffffff");
    const [colorsArray, setColorsArray]= useState([]);
    
    const [colorValueError, setcolorValueError]= useState(false);
    const [colorNameError, setColorNameError]= useState(false);
    const [paletteNameError, setPaletteNameError]= useState(false);
    
    useEffect(()=>{
        chroma(selectedColor).luminance() > 0.099 ? setTextColor('black'): setTextColor('white')
    },[selectedColor])

    useEffect(()=>{
        colorsArray.find( (color)=> color.name.toLowerCase() === colorName.toLowerCase() ) ?
        setColorNameError(true) : setColorNameError(false)

    },[colorsArray, colorName]);

    useEffect(()=>{
        palettes.find( (p)=> p.paletteName.trim().toLowerCase() === paletteName.trim().toLowerCase() ) ?
        setPaletteNameError(true) : setPaletteNameError(false)
        
    },[palettes, paletteName])
    
    useEffect(()=>{
        colorsArray.find( (c)=> c.color === selectedColor) ?
        setcolorValueError(true) : setcolorValueError(false)

    },[colorsArray, selectedColor])
    
    const handleAddColor=()=>{
        if (colorsArray.length === 20){
            return
        } else{
            setColorsArray( prev=>[
                ...prev, 
                {
                    color: selectedColor,
                    name: colorName
                }
            ]);
            setColorName('');
            setColorObject('#fff');
        }
    }

    const handleSubmitPalette=()=>{
        const lastChar= paletteName.slice(-1) 
        const pName= paletteName;
        if (lastChar === ' ') {
            pName.slice(0,-1)
        }
        // console.log(/^\w\s*$/.test(paletteName))
        // if(/^\w\s*$/.test(paletteName)){
        dispatch(addPalette(generatePalette({
            paletteName: pName,
            emoji: '😄',
            id: paletteName.replace(' ', '-'),
            colors: colorsArray 
        }) ) )
        history.push('/')
        // }
    }
    const disableButton=()=>{
        return paletteNameError 
        || colorNameError 
        || colorValueError
        || colorName === ''
        || paletteName === ''
    }

    return (
        <div className="new-palette">
            <div className={`side-nav ${navStatus? "show-side":''}`} >
                <span className="palette-input-container">
                    <input 
                        type="text" 
                        placeholder="palette name" 
                        value={paletteName}
                        onChange={(e)=>setPaletteName(e.target.value)}
                        className={`new-palette-input ${paletteNameError ? 'red':''}`}
                    />
                    <label 
                        style={{opacity: `${paletteNameError? 1: 0}`}}
                    >
                        the name already exists*
                    </label>
                </span>
                <span className="palette-input-container">
                    <input 
                        type="text" 
                        placeholder="color name" 
                        value={colorName}
                        onChange={ (e)=> setColorName(e.target.value.substr(0, 8)) }
                        className={`new-palette-input ${colorNameError ? 'red':''}`}
                    />
                    <label 
                        style={{opacity: `${colorNameError? 1: 0}`}}
                    >
                        the name already exists*
                    </label>
                </span>
                <span className='color-picker-container'>
                    <SketchPicker 
                        className="color-picker"
                        color={selectedColor} 
                        onChange={(newColor)=> setColorObject(newColor.hex)}
                    />
                    <p
                        style={{opacity: `${colorValueError? 1: 0}`}}
                    >
                        repetetive color 
                    </p>
                </span>
                
                <button 
                    style={{backgroundColor: selectedColor, color: textColor}}
                    className="add-button"
                    disabled={disableButton()}
                    onClick={handleAddColor}
                >
                    add color
                </button>
            </div>
            
            <div className={`new-palette-content ${navStatus? "show-side" : ''}`} >
                <nav>
                    <span className="nav-container">
                        <span onClick={()=>history.push("/")} className="home-nav-link"> <h1>Paletto</h1> </span>
                        <PIcon onClick={()=>setStatus(!navStatus)} width="20px" height="20px"/>
                    </span>
                </nav>
                <div className="new-palette-colors">
                    {
                        colorsArray.map(({color}, index)=> 
                            <div 
                                style={{backgroundColor: color}}
                                className="new-palette-color-box"
                                key={index}
                            >
                                <RemoveIcon onClick={()=> 
                                    setColorsArray( prev => prev.filter( (stateColor) =>
                                        stateColor.color !== color
                                ))}/>
                                <span style={{
                                    color: chroma(color).luminance() > 0.099 ? 'black': 'white'
                                }}>
                                    {color}
                                </span>
                            </div>
                        )
                    }
                </div>
                <footer>
                    <span>{paletteName}</span>
                    <span className="footer-buttons">
                        <button onClick={()=> setColorsArray([])}>
                            clear palette
                        </button>
                        <button onClick={handleSubmitPalette}>
                            submit palette
                        </button>
                    </span>
                </footer>
            </div>
            
        </div>
    )
}

const mapStateToProps= (state)=>({
    palettes: state.palettes
})

export default connect(mapStateToProps)(NewPalette);
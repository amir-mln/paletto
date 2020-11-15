import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as CopyIcon} from '../../Assets/icon-copy.svg'
import {ReactComponent as MoreIcon} from '../../Assets/icon-more.svg'
import chroma from 'chroma-js';

import './color-box-component.scss';

const ColorBox = ({colorValue, colorName, paletteId, colorId, showMore, inputWidth, inputHeight})=> {
    const [copySvgClicked, setCopyState]= useState(false);

    useEffect(()=>{
        setTimeout(()=> setCopyState(false), 2500)
    }, [copySvgClicked])

    const copyToClipboard= (colorText)=>{
       const dummyElm= document.createElement('textarea');
       document.body.appendChild(dummyElm);
       dummyElm.value= colorText;
       dummyElm.select();
       document.execCommand('copy');
       document.body.removeChild(dummyElm);
    }

    let dynamicColor='black';
    if( chroma(colorValue).luminance() < 0.04) {
        dynamicColor= 'white';
    }

    return(
    <div 
        className="color-box" 
        style={ {backgroundColor: colorValue, width: inputWidth, height: inputHeight } }
    >   
        <div 
            className={`color-box-overlay ${ copySvgClicked && 'show'}`}
            style={ {backgroundColor: colorValue } } 
        />
        <div className={`color-box-overlay-message ${ copySvgClicked && 'show'}`}>
            <h2 style={{color:dynamicColor}}> copied! </h2>
            <p style={{color:dynamicColor}}> {colorValue} </p>
        </div>
        <div className="color-box-content">
            <span className="color-box-name" style={{color:dynamicColor}}>
                {colorName}
            </span>    
            <span className="copy-svg" onClick={()=>{ 
                copyToClipboard(colorValue)
                setCopyState(true)
                }}
            >
                <CopyIcon style={{fill: dynamicColor}} />
            </span>
            {
                showMore && 
                <Link to={`/palette/${paletteId}/${colorId}`} className="more-svg">
                    <MoreIcon style={{fill: dynamicColor}}/>
                </Link>
            }
        </div>
    </div>
)}

export default ColorBox;
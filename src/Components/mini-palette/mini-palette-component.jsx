import React from 'react';
// import ColorBox from '../color-box/color-box-componenet';
import './mini-palette-component.scss';
import { Link } from 'react-router-dom';

const MiniPalette= ({paletteName, emoji, colors, id})=> (
    <div className="mini-palette">
        <div className="mini-palette-container">
            <div className="mini-palette-colors">
                {
                    colors[500].map( 
                        ( {hex} )=> 
                        <div className="mini-palette-color" style={ {backgroundColor: hex } } key={hex}/> 
                    )
                }
            </div>
            <span className="mini-palette-footer">
                    <Link to={`/palette/${id}`}className="palette-link"> {paletteName} </Link>
                    <span> {emoji} </span>
            </span>
        </div>
    </div>
);

export default MiniPalette;
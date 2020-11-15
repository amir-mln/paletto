import React from 'react';
import { Link } from 'react-router-dom';
import './palette-header-component.scss';

const PaletteHeader= ({colorShade, setShade, colorMode, handleColorMode, showShadesRange })=>(
    <div className="header-container">
        <Link to="/" className="logo-header">paletto</Link>
        {
            showShadesRange &&
            <input 
                type="range" 
                className="color-range-input"
                min="100" 
                max="900" 
                step="100" 
                value={colorShade} 
                onChange={(e)=>setShade(e.target.value)}
            />
        }
        <span className="color-mode-menu" >
            <span>{colorMode}</span>
            <ul className="mode-menu-drop">
                <li onClick={()=>handleColorMode('hex')}>hex</li>
                <li onClick={()=>handleColorMode('rgb')}>rgb</li>
                <li onClick={()=>handleColorMode('hsl')}>hsl</li>
            </ul>
        </span>
    </div>
);

export default PaletteHeader;
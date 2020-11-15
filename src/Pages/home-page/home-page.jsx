import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ReactComponent as PrevIcon } from '../../Assets/icon-prev-page.svg'
import { ReactComponent as NextIcon } from '../../Assets/icon-next-page.svg'
import MiniPalette from '../../Components/mini-palette/mini-palette-component';

import './home-page.scss';

const HomePage= ({history, palettes})=>{
    const [pageNumbers, setNumbers]=useState({start: 0, end: 9, pageNumber: 1})   

    const handlePagination= (type)=>{
        if(type === 'next' && pageNumbers.pageNumber <= palettes.length/9 && palettes.length !== 9){
            setNumbers( (prev)=> ({
                start: prev.start+9, 
                end: prev.end+9,
                pageNumber: prev.pageNumber+1
            }) )
        }else if(type === 'prev' && pageNumbers.pageNumber > 1){
            setNumbers( (prev)=> ({
                start: prev.start-9, 
                end: prev.end-9,
                pageNumber: prev.pageNumber-1
            }) )
        }
    }
    
    return(
        <div className="home-page">
            <nav className="home-page-navbar">
                <span onClick={()=>history.push("/")} className="home-nav-link"> <h1>Paletto</h1> </span>
                <span onClick={()=>history.push("/palette/create-new")}>create a new palette</span>
            </nav>
            <section className="home-page-container">
                {
                    palettes.slice(pageNumbers.start, pageNumbers.end).map((palette)=> <MiniPalette {...palette} key={palette.id} />)
                }
            </section>
            <span className="pagination">
                <PrevIcon onClick={()=>handlePagination('prev')}/>
                <p>{pageNumbers.pageNumber}</p>
                <NextIcon onClick={()=>handlePagination('next')}/>
            </span>
        </div>
    )
}

const mapStateToProps= (state)=>({
    palettes: state.palettes
});

export default connect(mapStateToProps)(HomePage);
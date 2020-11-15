import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './Pages/home-page/home-page'
import Palette from './Components/palette/palette-component'
import NewPalette from './Components/create-palette/new-palette-component';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/palette/create-new" component={NewPalette} />
        <Route 
          exact
          path="/palette/:paletteId" 
          render={(routeParams)=> <Palette showShadesPalette={false} showShadesRange={true} {...routeParams} />} 
        />
        <Route 
          exact 
          path="/palette/:paletteId/:colorId" 
          render={(routeParams)=> <Palette showShadesPalette={true} showShadesRange={false} {...routeParams} />} />
      </Switch>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Meteors from "./components/Meteors";
import { Container } from 'reactstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (

    <div className="App">
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.54.0/mapbox-gl.css' rel='stylesheet' />
        <Header/>
        <Container>
            <Meteors/>
        </Container>
        <Footer/>
    </div>
  );
}

export default App;

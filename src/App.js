// src/App.js
import React from 'react';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer'; // Importa el componente Footer
import './App.css'; // Archivo de estilos globales

function App() {
  return (
    <div className="App">
      <MusicPlayer />
      <Footer />
    </div>
  );
}

export default App;
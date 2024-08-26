// src/components/MusicPlayer.js

import React, { useRef, useState, useEffect } from 'react';
import './MusicPlayer.css';

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Volumen inicial al 50%
  const [gridColors, setGridColors] = useState(Array(64).fill('#333')); // Inicializa los colores de la cuadrícula

  useEffect(() => {
    const updateGridColors = () => {
      setGridColors(prevColors =>
        prevColors.map(color => {
          // Genera un tono de gris aleatorio
          const randomGray = Math.floor(Math.random() * 255);
          const newColor = `rgb(${randomGray}, ${randomGray}, ${randomGray})`;
          return newColor;
        })
      );
    };

    const intervalId = setInterval(updateGridColors, 2000); // Cambia los colores cada 1 segundo

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error("Error al intentar reproducir el audio:", error);
        });
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="music-player">
      <div className="visualizer">
        <div className="grid">
          {gridColors.map((color, index) => (
            <div
              key={index}
              className="grid-item"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
      <audio ref={audioRef} loop volume={volume}>
        <source src="./assets/sleep-music.m4a" type="audio/mp3" />
        Tu navegador no soporta el elemento de audio.
      </audio>
      <div className="controls">
        <button onClick={togglePlayPause} className="control-button">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
}

export default MusicPlayer;
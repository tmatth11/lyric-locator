import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Header from './components/Header';
import LyricsContainer from './components/LyricsContainer';

function App() {
    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");

    const handleSearch = (artistName, songTitle) => {
        setArtist(artistName);
        setSong(songTitle);
    };

    return (
        <>
            <Header onSearch={handleSearch} />
            <hr className="w-full border border-danger border-2 opacity-50 mb-0" />
            {artist && song && <LyricsContainer artist={artist} song={song} />}
        </>
    )
}

export default App;

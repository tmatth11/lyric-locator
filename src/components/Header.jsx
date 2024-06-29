import React, { useState } from 'react';

const Header = ({ onSearch }) => {
    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(artist, song);
    };

    return (
        <div className='d-flex flex-column align-items-center mt-3 text-center'>
            <h1>Lyric Locator</h1>
            <p className='lead'>Type in the name of the desired artist and song in the fields below.</p>
            <form className='d-flex flex-column gap-2' onSubmit={handleSubmit}>
                <label htmlFor="artistInput" className="form-label">Artist Name <i class="bi bi-pencil-fill"></i></label>
                <input id="artistInput" className='form-control' type="text" placeholder="Enter artist name" value={artist} onChange={(e) => setArtist(e.target.value)} />
                <label htmlFor="songInput" className="form-label">Song Title <i class="bi bi-music-note-beamed"></i></label>
                <input id="songInput" className='form-control' type="text" placeholder="Enter song title" value={song} onChange={(e) => setSong(e.target.value)} />
                <button className='btn btn-success' type='submit'>Submit <i class="bi bi-check"></i></button>
            </form>
        </div>
    )
};

export default Header;
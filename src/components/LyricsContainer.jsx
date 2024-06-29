import React, { useState, useEffect } from 'react';

const LyricsContainer = ({ artist, song }) => {
    const [lyrics, setLyrics] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const cleanLyrics = (lyrics) => {
        const regex = /^(Paroles de la chanson|Lyrics to the song|Letra de la canción|Text der|Текст песни|Testo della canzone) .+ (par|by) .+/i;
        return lyrics.split('\n').filter(line => !regex.test(line)).join('\n');
    };

    useEffect(() => {
        if (artist && song) {
            setLoading(true);
            fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
                .then(response => response.json())
                .then(data => {
                    if (data.lyrics) {
                        setLyrics(cleanLyrics(data.lyrics));
                        setError(false);
                    } else {
                        setLyrics("");
                        setError(true);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching lyrics:', error);
                    setLyrics("");
                    setError(true);
                    setLoading(false);
                });
        }
    }, [artist, song]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(lyrics).then(() => {
            alert('Lyrics copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy lyrics: ', err);
        });
    };

    if (!artist || !song) {
        return null;
    }

    if (loading) {
        return (
            <div className='d-flex flex-column vh-100'>
                <div className='flex-grow-1 bg-light'>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='text-center p-5 bg-light'>
                            <h2>Loading...</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='d-flex flex-column vh-100'>
                <div className='flex-grow-1 bg-light'>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='text-center p-5 bg-light'>
                            <h2 className='text-danger'>Error: No lyrics found</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='d-flex flex-column vh-100'>
            <div className='flex-grow-1 bg-light'>
                <div className='d-flex flex-column align-items-center'>
                    <h2 className='mt-3 fw-bold text-center'>{song}</h2>
                    <h3 className='fw-light text-center'>by {artist}</h3>
                    <button onClick={copyToClipboard} className='btn btn-primary my-3'>Copy Lyrics</button>
                    <p className='w-75 pre-wrap'>{lyrics}</p>
                </div>
            </div>
        </div>
    );
};

export default LyricsContainer;
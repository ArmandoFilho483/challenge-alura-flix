import { useParams } from 'react-router-dom';
import { useVideosContext } from '../../context/Videos';
import styled from 'styled-components';
import NotFound from '../NotFound';
import React, { useEffect, useState } from 'react';

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 100%;
    margin: 100px auto 120px;
    min-height: 500px;
`;

const StyledTitle = styled.h2`
    width: 100%;
    text-align: center;
    font-size: 2.5rem;
    text-transform: uppercase;
    font-weight: 900;
    border-bottom: 3px solid #393939;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 20px;
`;

const button = styled.button`
    width: 180px;
    height: 54px;
    background-color: transparent;
    font-size: 1.25rem;
    font-weight: 900;
    color:#FFFFFF;
    border: 3px solid #2271D1;
    border-radius: 15px;
    align-self: center;
`

const Player = () => {
    const { id } = useParams();
    const { videos } = useVideosContext();
    const [videoToShow, setVideoToShow] = useState(null);

    useEffect(() => {
        if (!id || !videos || videos.length === 0) {
            return;
        }

        const foundVideo = videos.find(video => String(video.id) === String(id));

        if (!foundVideo) {
            console.error('No video found with the given id');
            return;
        }

        setVideoToShow(foundVideo);
    }, [id, videos]);

    const openVideoInNewTab = () => {
        if (videoToShow && videoToShow.link) {
            window.open(videoToShow.link, '_blank');
        }
    };

    if (!id) {
        console.error('No id parameter found in the URL');
        return <NotFound />;
    }

    if (!videos || videos.length === 0) {
        console.error('No videos found in context');
        return <NotFound />;
    }

    if (!videoToShow) {
        console.error('No video found with the given id');
        return <NotFound />;
    }

    const canLoadVideo = videoToShow.link && !videoToShow.link.includes('youtu.be');

    return (
        <StyledSection>
            {canLoadVideo ? (
                <>
                    <StyledTitle>{videoToShow.title}</StyledTitle>
                    <iframe
                        src={videoToShow.link}
                        title={videoToShow.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        width="800"
                        height="450"
                    ></iframe>
                </>
            ) : (
                <ErrorMessage>
                    O vídeo não pode ser exibido aqui devido a uma política de segurança do YouTube.
                    <br />
                    <button onClick={openVideoInNewTab}>Abrir no YouTube</button>
                </ErrorMessage>
            )}
        </StyledSection>
    );
};

export default Player;

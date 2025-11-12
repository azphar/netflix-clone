import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setAPIData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: '',
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTBjZjQ1ZDhmZWI0ZTI3NzcyNjVhZjE1M2Y4ZGNkZCIsIm5iZiI6MTc2MjY3MzU3Ni42NDIsInN1YiI6IjY5MTA0M2E4MzEzN2M3ZGFmMTg3NGI5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8gz308QCggq2mEryLmolqOQYCHPHvqIHJGddJ0bXduU',
    },
  };

  useEffect(() => {
    if (!id) return;

    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        const first =
          (res && res.results && res.results[0]) || {
            name: '',
            key: '',
            published_at: '',
            type: '',
          };
        setAPIData(first);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player">
      <img
  src={back_arrow_icon}
  alt="Back"
  onClick={() => {
    if (window.history.length > 1) {
      navigate(-1);                 // go back one page
    } else {
      navigate('/', { replace: true }); // fallback to Home
    }
  }}
/>

      <iframe
        width="90%"
        height="90%"
        src={apiData.key ? `https://www.youtube.com/embed/${apiData.key}` : ''}
        title="trailer"
        allowFullScreen
      ></iframe>

      <div className="player-info">
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : ''}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;




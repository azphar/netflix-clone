import React, { Component, createRef } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

class TitleCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
    };
    this.cardsRef = createRef();
    this.handleWheel = this.handleWheel.bind(this);
  }

  handleWheel(e) {
    e.preventDefault();
    if (this.cardsRef.current) {
      this.cardsRef.current.scrollLeft += e.deltaY;
    }
  }

  componentDidMount() {
    const { category } = this.props;
    this.fetchMovies(category);

    const ref = this.cardsRef.current;
    if (ref) {
      ref.addEventListener('wheel', this.handleWheel, { passive: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchMovies(this.props.category);
    }
  }

  componentWillUnmount() {
    const ref = this.cardsRef.current;
    if (ref) {
      ref.removeEventListener('wheel', this.handleWheel, { passive: false });
    }
  }

  fetchMovies(category) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTBjZjQ1ZDhmZWI0ZTI3NzcyNjVhZjE1M2Y4ZGNkZCIsIm5iZiI6MTc2MjY3MzU3Ni42NDIsInN1YiI6IjY5MTA0M2E4MzEzN2M3ZGFmMTg3NGI5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8gz308QCggq2mEryLmolqOQYCHPHvqIHJGddJ0bXduU',
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${category || 'now_playing'}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ apiData: data.results || [] });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { title } = this.props;
    const { apiData } = this.state;

    return (
      <div className="title-cards">
        <h2>{title ? title : 'Popular on Netflix'}</h2>

        <div className="card-list" ref={this.cardsRef}>
          {apiData.map((card, index) => (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${
                  card.backdrop_path || card.poster_path || ''
                }`}
                alt=""
              />
              <p>{card.original_title || card.title || card.name}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default TitleCards;






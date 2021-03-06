import React, { Component } from 'react';
import { getMovieInfoForId } from '../utils/api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

// FROM movie-search-backend:
//
// const movieObj = {
//   id: movieResult.id,
//   rating: movieResult.vote_average,
//   title: movieResult.title,
//   releaseDate: movieResult.release_date,
//   posterUrl: baseImgUrl + movieResult.poster_path,
//   summary: movieResult.overview
// }

class MovieDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {
        id: '',
        rating: '',
        title: '',
        releaseDate: '',
        posterUrl: '',
        summary: ''
      }
    }
  }
  async componentWillMount() {
    // extract id from url, '/movie/' is 7 chars long
    const movieId = this.props.location.pathname.slice(7);
    console.log('movieId is:', movieId);
    this.setState({
      movie: await getMovieInfoForId(movieId)
    });
    console.log('movie found:', this.state.movie);
  }
  
  render() {
    const movie = this.state.movie;
    return (
      <Container style={{ margin: 40 }}>
        <Row>
          <Link to='/'>
            <Button style={{ margin: 20 }} variant='danger'>Back</Button>
          </Link>
        </Row>
        <Row>
          <Col>
            <Image src={movie.posterUrl} fluid />
          </Col>
          <Col>
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.releaseDate}</p>
            <p>Rating: {movie.rating}</p>
            <p>Summary: {movie.summary}</p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default MovieDetail;
import React, { Component } from 'react';
import { getPopular, getQueryResult } from '../utils/api'
import { Link } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import '../style.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { popular: null, showResults: false };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentWillMount() {
    const popular = await getPopular()
    this.setState({
      popular: popular
    })
  }

  async handleButtonClick(event) {
    event.preventDefault()
    if (this.state.showResults) {
      this.refs.searchBar.value = '';
      
      this.setState({
        searchResults: [],
        showResults: false,
        searchText: ''
      });
    } else {
      this.setState({
        searchResults: await getQueryResult(this.state.searchText),
        showResults: true
      });
    }
  }

  handleChange(event) {
    this.setState({
      searchText: this.refs.searchBar.value
    })
  }
  
  render() {
    return (
      <div>
        <Container style={{ margin: 20 }}>
        <h2>Search Movies</h2>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                type="input"
                ref="searchBar"
                placeholder="Pick a movie, any movie..."
                onChange={this.handleChange}
                disabled={this.state.showResults}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Button
                variant={this.state.showResults ? "danger" : "primary"}
                type="submit"
                onClick={this.handleButtonClick}>
                  {this.state.showResults ? "Clear" : "Search"}
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
        <h2>{!this.state.showResults ? 'Popular Movies' : `Results for "${this.state.searchText}"`}</h2>
        <ListGroup>
          {this.state.showResults ?
          this.state.searchResults &&
          this.state.searchResults.map((movie) => (
              (<ListGroupItem 
                key={movie.id.toString()}>
                <Link to={`/movie/${movie.id}`}>
                  {movie.title}
                </Link>
              </ListGroupItem>)
          ))
          : this.state.popular &&
          this.state.popular.map((movie) => (
              (<ListGroupItem 
                key={movie.id.toString()}>
                <Link to={`/movie/${movie.id}`}>
                  {movie.title}
                </Link>
              </ListGroupItem>)
          ))}
        </ListGroup>
        </Container>
      </div>
    );
  }
}

export default Home;
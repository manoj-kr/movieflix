import React, { Component } from 'react';
import logo from '../../logo.svg';
import { connect } from 'react-redux';
import { fetchMovies } from '../../actions/movieActions';


import './Movies.css';

class Movies extends Component {

  componentWillMount(){
    this.props.fetchMovies();
    //console.log(this.props);
  }

  render(){
    return (
      <div className="container">
      <div className="bs-docs-section clearfix">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#">Movieflix</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                  <ul className="navbar-nav mr-auto"></ul>
                  <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search Movies</button>
                  </form>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="bs-docs-section movie-detail-section">
        <div className="row">
          <div className="col-lg-3">
          <div className="movie-img">
            <img src={this.props.movies.Poster !== undefined ? this.props.movies.Poster : logo}/>
          </div>
          </div>
          <div className="col-lg-9">
            <div className="jumbotron mb-0 movie-detail-text">
              <h1 className="display-3">{this.props.movies.Title}</h1>
              <h1 className="movie-date">{this.props.movies.Released}</h1>
              <div className="row">
                <div className="col-md-2 ratings">
                  <span className="rating">{this.props.movies.Ratings !== undefined ? this.props.movies.Ratings[1].Value: ''}</span><br/>
                  Rotten Tomatoes
                </div>
                <div className="col-md-2 ratings">
                  <span className="rating">{this.props.movies.Ratings !== undefined ? this.props.movies.Ratings[0].Value: ''}</span><br/>
                  IMDB Rating
                </div>
                <div className="col-md-2"><a className="btn btn-primary btn-lg watched" href="#" role="button">Watched</a></div>
              </div>
              <hr className="my-4"/>
              <div className="heading">Description</div>
              <p className="lead">{this.props.movies.Plot}</p>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className="bs-docs-section">
      <div className="row">
        <div className="col-md-12"><span className="heading">Watched</span></div></div>
        <div className="row">
          <div className="col-lg-2">
            <img src={logo} className="movies-list"/>
          </div>
          <div className="col-lg-2">
            <img src={logo} className="movies-list"/>
          </div>
          <div className="col-lg-2">
            <img src={logo} className="movies-list"/>
          </div>
          <div className="col-lg-2">
            <img src={logo} className="movies-list"/>
          </div>
          <div className="col-lg-2">
            <img src={logo} className="movies-list"/>
          </div>
          <div className="col-lg-2">
            <img src={logo} className="movies-list"/>
          </div>
        </div>
      </div>
    </div>
  );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies
})

export default connect(mapStateToProps, { fetchMovies })(Movies);

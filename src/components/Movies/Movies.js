import React, { Component } from 'react';
import logo from '../../logo.svg';
import noposter from '../../noposter.jpg';
import { connect } from 'react-redux';
import { fetchMovies, updateWatchList, getWatchList, updateVote} from '../../actions/movieActions';



import './Movies.css';

class Movies extends Component {

  constructor(){
      super();
      this.state = {movieLoading : true};
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.toggleToWatchedList = this.toggleToWatchedList.bind(this);
  }

  componentDidMount(){
    this.props.getWatchList();
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movieLoading: false
    });
  }

  onSubmit(e){
    e.preventDefault();
    if(this.state.search !== "" && this.state.search !== undefined){
      this.setState({movieLoading: true});
      this.props.fetchMovies(this.state.search);
    }
    this.refs.search.focus();
  }

  isWatched(id){
    let wList = localStorage.getItem("watchList");
    if(wList === null){
      return false;
    }else{
      return JSON.parse(wList).filter(function(movie){
        return movie.imdbID === id;
      }).length;
    }
  }

  toggleToWatchedList(){
    this.props.updateWatchList(this.props.movieDetails);
  }

  findInfo(movieTitle){
    this.setState({search: ''});
    this.refs.search.value = "";
    this.setState({movieLoading: true});
    this.props.fetchMovies(movieTitle);
  }

  render(){
    let that = this;
    return (
      <div className="container">
      <div className="bs-docs-section clearfix">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand">Movieflix</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                  <ul className="navbar-nav mr-auto"></ul>
                  <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" name="search" ref="search" onChange={this.onChange}/>
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search Movies</button>
                  </form>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {
        (this.state.movieLoading) ?
          (<div className="bs-docs-section movie-detail-loading">
            <div className="row details-loading">
              <div className="col-lg-3">
                <div className="loading-img"></div>
              </div>
              <div className="col-lg-9">
                <div className="jumbotron mb-0 movie-detail-text">
                  <h1 className="loading-title"></h1>
                  <h1 className="loading-date"></h1>
                  <div className="row">
                    <div className="col-md-2 ratings">
                      <div className="loading-rate"></div>
                    </div>
                    <div className="col-md-2 ratings">
                      <div className="loading-rate-2"></div>
                    </div>
                    <div className="col-md-2 watch-btn">

                    </div>
                  </div>
                  <hr className="my-4"/>
                  <div className="heading loading-desc"></div>
                  <div className="lead loading-desc-text">
                    <div></div><div></div><div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>)
          : ""
      }

      {this.state.movieLoading === false && Object.keys(this.props.movieDetails).length !== 0 && this.props.movieDetails.Response !== 'False' ? <div className="bs-docs-section movie-detail-section">
        <div className="row">
          <div className="col-lg-3">
          <div className="movie-img">
            <img src={this.props.movieDetails.Poster !== undefined ? this.props.movieDetails.Poster : logo} alt="" onClick={this.toggleToWatchedList}/>
          </div>
          </div>
          <div className="col-lg-9">
            <div className="jumbotron mb-0 movie-detail-text">
              <h1 className="display-3">{this.props.movieDetails.Title}</h1>
              <h1 className="movie-date">{this.props.movieDetails.Released}</h1>
              <div className="row">
                <div className="col-md-2 ratings">
                  <span className="rating">{(this.props.movieDetails.Ratings !== undefined && this.props.movieDetails.Ratings[1] !== undefined) ? this.props.movieDetails.Ratings[1].Value: ''}</span><br/>
                  Rotten Tomatoes
                </div>
                <div className="col-md-2 ratings">
                  <span className="rating">{(this.props.movieDetails.Ratings !== undefined && this.props.movieDetails.Ratings[0] !== undefined) ? this.props.movieDetails.Ratings[0].Value: ''}</span><br/>
                  IMDB Rating
                </div>
                <div className="col-md-2"><button className="btn btn-primary btn-lg watched" role="button" onClick={this.toggleToWatchedList}>{this.isWatched(this.props.movieDetails.imdbID) ? 'Watched' : 'Watch'}</button></div>
              </div>
              <hr className="my-4"/>
              <div className="heading">Description</div>
              <p className="lead">{this.props.movieDetails.Plot}</p>
            </div>
          </div>
        </div>
      </div> : (this.state.movieLoading === false && (Object.keys(this.props.movieDetails).length !== 0) ? (<div className="no-movie-found">No movie found with the search key</div>) : "")}
      <hr/>
      <div className="bs-docs-section">
      <div className="row">
        <div className="col-md-12"><span className="heading">Watched</span></div></div>
        <div className="row">
          { (this.props.watchList !== null) ?
            this.props.watchList.map(function(movie, key){
              return (<div className="col-lg-2 watch-card" key={key}>
                <img src={movie.Poster !== undefined && movie.Poster !== "N/A" ? movie.Poster : noposter} alt="" className="movies-list"/>
                <a className={(movie.vote == 1 ? 'up-voted' : '') + ' up-vote'} title="Up Vote" onClick={() => {that.props.updateVote(movie.imdbID, 1)}}></a>
                <a className={(movie.vote === 0 ? 'down-voted' : '') + ' down-vote'} title="Down Vote" onClick={() => {that.props.updateVote(movie.imdbID, 0)}}></a>
                <a className="unwatch" title="Unwatch" onClick={() => {that.props.updateWatchList(movie)}}></a>
                <a className="info" title="More Info" onClick={() => {that.findInfo(movie.title)}}></a>
              </div>);
            }) : (<div className="col-lg-12 no-results">You have not watched any movie yet.</div>)
          }
        </div>
      </div>
    </div>
  );
  }
}

const mapStateToProps = state => ({
  movieDetails: state.movies.movieDetails,
  watchList: state.movies.watchList
})

export default connect(mapStateToProps, { fetchMovies, updateWatchList, getWatchList, updateVote })(Movies);

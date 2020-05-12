import React, { Component } from "react";
import "./WatchMovieList.css";
import WatchMovieShow from "./WatchMovieShow.js";
import MovieShow from "./MovieShow.js";
import $ from "jquery";

class WatchMovieList extends Component {
  state = { watchList: [] };
  constructor(props) {
    super(props);
    this.displayWatchlist = this.displayWatchlist.bind(this);
  }
  componentDidMount() {
    this.displayWatchlist();
  }
  //display the movies that are in watchlist
  displayWatchlist() {
    var movieBoxes = [];
    var watchlist = [];
    var savedWatchlist = [];
    savedWatchlist = JSON.parse(localStorage.getItem("watchlistshow"));
    if (savedWatchlist) {
      watchlist = savedWatchlist;
    }
    Array.prototype.forEach.call(watchlist, movie => {
      const movieBox = (
        <WatchMovieShow
          displayWatchlist={this.displayWatchlist}
          key={movie.id}
          movie={movie}
        />
      );
      movieBoxes.push(movieBox);
    });
    this.setState({ rows: movieBoxes });
  }
  //search movies by input keyword
  performSearch(searchTerm) {
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=40c4aa46310b723fa9400363a0f2893c&query=" +
      searchTerm;

    $.ajax({
      url: urlString,
      success: searchResults => {
        const results = searchResults.results;
        var movieBoxes = [];
        results.forEach(movie => {
          if (movie.poster_path !== null) {
            movie.poster =
              "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          } else {
            movie.poster =
              "https://www.underconsideration.com/brandnew/archives/google_broken_image_00_b_logo_detail.gif";
          }
          const movieBox = <MovieShow key={movie.id} movie={movie} />;
          movieBoxes.push(movieBox);
        });
        this.setState({ rows: movieBoxes });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }
  searchChangeHandler(event) {
    const searchTerm = event.target.value;
    if (searchTerm.trim() === "") {
      this.displayWatchlist();
    } else {
      this.performSearch(searchTerm);
    }
  }
  render() {
    return (
      <div className="App">
        <div className="watchlist-title-box">
          My Watchlist
          <hr />
        </div>

        <input
          className="search-box"
          style={{
            fontSize: 18,
            display: "block",
            width: "95%",
            marginTop: 30,
            marginBottom: 20,
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
            borderBottom: "0.3px solid #8091A5",
            marginLeft: "30px",
            backgroundColor: "#262d40",
            color: "white"
          }}
          onChange={this.searchChangeHandler.bind(this)}
          placeholder="Search..."
        />
        <div
          style={{
            position: "relative",
            height: "520px",
            overflowY: "scroll",
            overflowX: "hidden"
          }}
        >
          {this.state.rows}
        </div>
      </div>
    );
  }
}

export default WatchMovieList;

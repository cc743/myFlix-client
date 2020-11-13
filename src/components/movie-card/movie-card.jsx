import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const { movie, handleClick } = this.props;

    return (
      <div onClick = {() => handleClick(movie)} className = "movie-card">{movie.Title}</div>
    );
  }
}
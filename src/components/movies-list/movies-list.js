import React from 'react';
import Movie from '../movie/movie';

import './movies-list.scss';

export default ({ moviesData }) => {
  const movies = moviesData.map(data => {
    return (
      <Movie
        title={data.title}
        director={data.director}
        key={data.id}
        imageUrl={data.imageUrl}
      />
    );
  });

  return <div className="movies-list">{movies}</div>;
};

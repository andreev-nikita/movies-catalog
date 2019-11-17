import React from 'react';
import SwapiService from '../../services/swapi-service';

export default class App extends React.Component {
  state = {
    films: null,
  };

  swapiService = new SwapiService();

  componentDidMount() {
    this.swapiService.getAllFilms().then(films => {
      this.setState({ films });
    });
  }

  render() {
    console.log(this.state);
    return <div />;
  }
}

import React from 'react';
import './search.scss';

export default class Search extends React.Component {
  state = {
    term: '',
  };

  onTermChange = e => {
    const { onSearchChange = () => {} } = this.props;

    this.setState({
      term: e.target.value,
    });

    onSearchChange(e.target.value);
  };

  render() {
    const { term } = this.state;

    return (
      <input
        type="text"
        className="search"
        placeholder="Введите название"
        value={term}
        onChange={this.onTermChange}
      />
    );
  }
}

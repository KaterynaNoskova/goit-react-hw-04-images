import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };
  change = evt => {
    this.setState({ searchQuery: evt.target.value });
  };
  submit = evt => {
    evt.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({
      searchQuery: '',
    });
  };
  render() {
    const { searchQuery } = this.state;
    return (
      <header>
        <form className={css.SearchForm} onSubmit={this.submit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.change}
            value={searchQuery}
          />
        </form>
      </header>
    );
  }
}

import React from "react";
import SearchPresenter from "./SearchPresenter";
import { movieApi } from "../../api";
import { tvApi } from "../../api";

export default class extends React.Component {
  state = {
    movieResult: null,
    tvResult: null,
    searchTerm: "",
    error: null,
    loading: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm(searchTerm);
    }
  };

  updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({
      searchTerm: value,
    });
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({
      loading: true,
    });
    try {
      const {
        data: { results: movieResult },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvResult },
      } = await tvApi.search(searchTerm);

      this.setState({
        movieResult,
        tvResult,
      });
    } catch {
      this.setState({
        error: "Cannot find results.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {
      movieResult,
      tvResult,
      searchTerm,
      search,
      error,
      loading,
    } = this.state;
    return (
      <SearchPresenter
        movieResult={movieResult}
        tvResult={tvResult}
        searchTerm={searchTerm}
        search={search}
        error={error}
        loading={loading}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}

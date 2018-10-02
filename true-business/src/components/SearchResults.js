import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import NavBar from "./NavBar";

import "../css/SearchResults.css";

class SearchResults extends Component {
  state = {
    currentPage: 0,
    lastPage: 0,
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div>
        <NavBar search={this.props.search} />
        <div className="search">
          <div className="search__title"> Search Results </div>
          {this.props.searchResults ? this.createPagination() : null}
          <div className="search__results">
            {this.props.searchResults ? (
              this.props.searchResults.map((result, i) => {
                if (i < this.state.currentPage * 10 + 10 && i >= this.state.currentPage * 10) {
                  return (
                    <div
                      key={result.place_id}
                      className="results__result"
                      onClick={this.handleBusiness.bind(this, result)}>
                      <img
                        alt={result.name}
                        className={result.photos !== "No Photos Listed" ? "result__landscape" : null}
                        src={result.photos !== "No Photos Listed" ? result.photos[0].link : null}
                      />
                      <div className="result__info">
                        <div className="info__name">{result.name}</div>
                        <div className="info__address">
                          <div className="address__item">
                            {result.formatted_address
                              .split(",")
                              .splice(0, 1)
                              .toString()}
                          </div>
                          <div className="address__item">
                            {result.formatted_address
                              .split(",")
                              .splice(1, 2)
                              .join(",")
                              .trim()}
                          </div>
                          <div className="address__item">
                            {result.formatted_address
                              .split(",")
                              .splice(3)
                              .toString()
                              .trim()}
                          </div>
                        </div>
                        <div className="info__type">
                          {(result.types[0].charAt(0).toUpperCase() + result.types[0].slice(1)).replace(/_/g, " ")}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <div>No Results</div>
            )}
          </div>
          {this.props.searchResults ? this.createPagination() : null}
        </div>
      </div>
    );
  }
  handleBusiness = (business, event) => {
    this.props.business(business);
  };

  updatePage = currentPage => {
    this.setState({ currentPage });
  };

  createPagination = () => {
    let pages = new Set([0]);
    let lastPage =
      (this.props.searchResults.length / 10) % 1 === 0
        ? Math.floor(this.props.searchResults.length / 10) - 1
        : Math.floor(this.props.searchResults.length / 10);
    for (let i = 10; i < this.props.searchResults.length - 10; i++) {
      if (i % 10 === 0) {
        if (i >= this.state.currentPage * 10 - 20 && i <= this.state.currentPage * 10 + 20) {
          pages.add(i / 10);
        }
        if (this.state.currentPage <= 3 && i <= 40) {
          pages.add(i / 10);
        }
        if (
          this.state.currentPage >= this.props.searchResults.length / 10 - 4 &&
          i >= this.props.searchResults.length - 50
        ) {
          pages.add(i / 10);
        }
      }
    }
    if (this.props.searchResults.length > 10) {
      pages.add(lastPage);
    }
    pages = [...pages].sort((x, y) => x - y);
    if (this.state.currentPage > 3) pages.splice(1, 0, "...");
    if (this.state.currentPage < lastPage - 3) pages.splice(pages.length - 1, 0, "...");
    return (
      <div className="results__pagination">
        Page {this.state.currentPage} / {lastPage}
        <div id="pagination" className="pagination__pages">
          {pages.map((page, i) => {
            if (page === "...") {
              return (
                <button key={i + page} id={page} className="pagination__page--no-hover">
                  {page}
                </button>
              );
            }
            return (
              <button key={page} id={page} className="pagination__page" onClick={this.updatePage.bind(this, page)}>
                {page}
              </button>
            );
          })}
        </div>
      </div>
    );
  };
}

export default withRouter(SearchResults);

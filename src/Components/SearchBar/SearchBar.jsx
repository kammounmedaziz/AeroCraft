import React from "react";
import "./SearchBar.css";

// So far it's possible to search only thgough city name
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  // This search method actually runs a search method from
  // the APP component. That's why: this.PROPS....
  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  render() {
    return (
      <div className="w-full max-w-2xl mb-8">
        <div className="flex">
          <input
            type="text"
            className="flex-1 px-4 py-3 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Search city..."
            onChange={this.handleTermChange}
          />
          <button
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-r-lg hover:opacity-90 transition-opacity"
            onClick={this.search}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}



export default SearchBar;

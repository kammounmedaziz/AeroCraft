import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(event) {
    this.props.onSearch(this.state.term);
    event.preventDefault();
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  render() {
    return (
      <div className="flex justify-center my-6">
        <form
          onSubmit={this.search}
          className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl shadow-md"
        >
          <input
            type="text"
            placeholder="Search a city..."
            className="px-4 py-2 rounded-xl text-white bg-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
            value={this.state.term}
            onChange={this.handleTermChange}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition-shadow duration-300 shadow-md hover:shadow-blue-500/50"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
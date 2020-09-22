import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';

function levenshteinDistance(a, b) {
  // calculate the edit distance between two strings (case insensitive)
  // https://en.wikipedia.org/wiki/Levenshtein_distance
  a = a.toLowerCase();
  b = b.toLowerCase();
  let costs = [];
  for(let i = 0; i <= a.length; i++) {
    let lastValue = i;
    for(let j = 0; j <= b.length; j++) {
      if(i === 0) costs[j] = j;
      else {
        if(j > 0) {
          let newValue = costs[j-1];
          if(a.charAt(i - 1) !== b.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j-1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if(i > 0) costs[b.length] = lastValue;
  }
  return costs[b.length];
}

class FancyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modifiedData: undefined, currentDisplay: props.data, currentPage: 1 };
  }

  searchData(value) {
    if(!value || value === "" || value.trim(" ") === "") {
      this.setState({modifiedData: undefined, currentDisplay: this.props.data});
      return;
    }
    let searchResults = [];
    for(let i = 0; i < this.props.data.length; i++) {
      let shouldShow = false;
      let bestDist = undefined;
      for(let j = 0; j < this.props.searchable.length; j++) {
        let checkValue = String(this.props.data[i][this.props.searchable[j]]);
        let dist = levenshteinDistance(checkValue, value);
        if(dist < checkValue.length) shouldShow = true;
        if(!bestDist || dist < bestDist) bestDist = dist;
      }
      if(shouldShow) {
        let newData = this.props.data[i];
        newData.bestDist = bestDist;
        searchResults.push(newData);
      }
    }
    searchResults.sort((a, b) => a.bestDist - b.bestDist);
    this.setState({currentDisplay: searchResults, modifiedData: searchResults});
  }

  changePage(p, max) {
    if(p <= 0) p = 1;
    if(p > max) p = max;
    if(p === this.state.currentPage) return;

    if(this.state.modifiedData) {
      // Allow pagination on search results
      this.setState({
        currentPage: p,
        currentDisplay: this.state.modifiedData.slice(
          ((p * this.props.paginated) - this.props.paginated), 
          p * this.props.paginated)
      });
    } else {
      this.setState({
        currentPage: p,
        currentDisplay: this.props.data.slice(
          ((p * this.props.paginated) - this.props.paginated), 
          p * this.props.paginated)
      });
    }
  }

  render() {
    let headers = this.props.headers.map((h, idx) => {
      return(<th key={idx}>{h}</th>);
    });
    let rows = this.state.currentDisplay.slice(0, this.props.paginated).map((row) => {
      return(this.props.rowMaker(row));
    });

    let numberOfPages = 0;
    if(this.props.paginated) {
      if(this.state.modifiedData) numberOfPages = Math.ceil(this.state.modifiedData.length / this.props.paginated);
      else numberOfPages = Math.ceil(this.props.data.length / this.props.paginated)
    }
    let pageItems = [];
    for(let i = 0; i < numberOfPages; i++) {
      if((i + 1) === this.state.currentPage) {
        pageItems.push(
          <Pagination.Item active onClick={() => { this.changePage(i+1) }}key={i}>{i+1}</Pagination.Item>
        );
      } else {
        pageItems.push(
          <Pagination.Item onClick={() => { this.changePage(i+1) }}key={i}>{i+1}</Pagination.Item>
        );
      }    
    }

    return(
      <div>
        {this.props.searchable &&
          <Form.Group controlId="search">
            <Form.Control className="float-right half-width" onChange={(e) => { this.searchData(e.target.value) }} name="searchTable" type="text" placeholder="Search..." />
          </Form.Group>
        }
        <Table bordered>
          <thead>
            <tr>
              {headers}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
        {numberOfPages > 0 &&
          <Pagination>
            <Pagination.First onClick={() => { this.changePage(1, numberOfPages) }} />
            <Pagination.Prev onClick={() => { this.changePage(this.state.currentPage - 1, numberOfPages) }} />
            {pageItems}
            <Pagination.Next onClick={() => { this.changePage(this.state.currentPage + 1, numberOfPages) }} />
            <Pagination.Last onClick={() => { this.changePage(numberOfPages, numberOfPages) }} />
          </Pagination>
        }
      </div>
    );
  }
}

export default FancyTable;
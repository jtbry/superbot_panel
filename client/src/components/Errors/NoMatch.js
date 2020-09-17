import React from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNotFound from "../../assets/images/page_not_found.svg";

class NoMatch extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return(
      <Container className="mt-5 text-center">
        <img src={PageNotFound} className="mt-5 w-50" alt="Page Not Found" />
        <div className="mt-5">
          <h2 className="mt-3">Sorry! That page wasn't found.</h2>
          <h4>You can <a href="#goBack" onClick={this.goBack}>Return</a> to the previous page.</h4>
          <h5>Or go to the <a href="/">Home Page</a></h5>
        </div>
      </Container>
    );
  }

}

export default NoMatch;
import React from 'react';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return(
        <h1>Panel</h1>
    );
  }
}

export default Panel;
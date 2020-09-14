import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  // App constructor for initializing state and handling props
  constructor(props) {
    super(props);
    this.state = {apiIsWorking: false, loaded: false};
  }
  
  // Render the appropriate app view
  render() {
    let msg = "";
    if(!this.state.loaded) {
      msg = "Loading...";
    } else {
      if(this.state.apiIsWorking) {
        msg = "Example App is Working!";
      } else {
        msg = "Unable to Contact API...";
      }
    }

    return(
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {msg}
        </p>
      </header>
    </div>
    )
  }

  // After the component initially mounts, check the API
  componentDidMount() {
    fetch('/ping')
      .then((response) => {
        if(response.ok) {
          return response.text();
        } else {
          this.setState({apiIsWorking: false, loaded: true});
        }
      })
      .then((possibleResponse) => {
        if(possibleResponse) {
          this.setState({apiIsWorking: true, loaded: true});
        }
      })
      .catch((err) => {
        if(err) {
          console.log(err);
          this.setState({apiIsWorking: false, loaded: true, error: err});
        }
      });
  }
}

export default App;

import Axios from 'axios';
import React from 'react';
import Loading from '../Loading';
import ServerError from '../Errors/ServerError';
import NoDataFound from '../Errors/NoDataFound';
import Table from 'react-bootstrap/Table';

function BotRow(props) {
  if(!props.data.name) props.data.name = "N/A";
  if(!props.data.code) props.data.code = "N/A";
  if(props.data.is_online !== 1 && props.data.is_online !== 0) props.data.is_online = "N/A";
  if(!props.data.last_online) props.data.last_online = "N/A";
  if(!props.data.last_ip) props.data.last_ip = "N/A";

  return(
    <tr>
      <td>{props.data.name}</td>
      <td>{props.data.code}</td>
      {props.data.is_online === 1
        ? <td style={{color: "green"}}>ONLINE</td>
        : <td style={{color: "red"}}>OFFLINE</td>
      }
      <td>{new Date(props.data.last_online).toLocaleString()}</td>
      <td>{props.data.last_ip}</td>
    </tr>
  );
}

class ExistingBots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: undefined, loading: true, error: false};
  }

  render() {
    if(this.state.loading) {
      return(<Loading />);
    }
    if(this.state.error) {
      return(<ServerError />);
    }
    if(this.state.data) {
      if(this.state.data.length <= 0) {
        return(
          <>
          <NoDataFound />
          <h3 className="text-center">Try adding some bots!</h3>
          </>
          );
      } else {
        const botRows = this.state.data.map((bot) => {
          return <BotRow key={bot.code} data={bot} />
        })
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Status</th>
                <th>Last Online</th>
                <th>Last IP</th>
              </tr>
            </thead>
            <tbody>
              {botRows}
            </tbody>
          </Table>
        );
      }
    }
  }

  componentDidMount() {
    Axios.get("/api/bots/list")
      .then((response) => {
        this.setState({
          data: response.data,
          loading: false
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: true
        })
      })
  }
}

export default ExistingBots;
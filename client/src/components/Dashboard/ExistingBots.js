import Axios from 'axios';
import React from 'react';
import Loading from '../Common/Loading';
import ServerError from '../Errors/ServerError';
import NoDataFound from '../Errors/NoDataFound';
import FancyTable from '../Common/FancyTable';

function botRowMaker(data) {
  if(!data.name) data.name = "N/A";
  if(!data.code) data.code = "N/A";
  if(data.is_online !== 1 && data.is_online !== 0) data.is_online = "N/A";
  if(!data.last_online) data.last_online = "N/A";
  if(!data.last_ip) data.last_ip = "N/A";

  return(
    <tr key={data.code}>
      <td>{data.name}</td>
      <td>{data.code}</td>
      {data.is_online === 1
        ? <td style={{color: "green"}}>ONLINE</td>
        : <td style={{color: "red"}}>OFFLINE</td>
      }
      <td>{new Date(data.last_online).toLocaleString()}</td>
      <td>{data.last_ip}</td>
    </tr>
  );
}

class ExistingBots extends React.Component {
  constructor(props) {
    super(props);
    // data is the full bot list from api, currentDisplay is what will render. currentDisplay will change based off pagination and search results
    this.state = {data: undefined, currentDisplay: undefined, loading: true, error: false};
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
        return (
          <FancyTable 
            paginated={10}
            searchable={["name", "code", "last_ip"]}
            headers={["Name", "Code", "Status", "Last Online", "Last IP"]} 
            rowMaker={botRowMaker} 
            data={this.state.data} 
          />
        );
      }
    }
  }

  componentDidMount() {
    Axios.get("/api/bots/list")
      .then((response) => {
        this.setState({
          data: response.data,
          currentDisplay: response.data,
          loading: false
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: true
        })
      });
  }
}

export default ExistingBots;
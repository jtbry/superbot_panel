import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class NewBotModal extends React.Component {
  constructor(props) {
    super(props);
    this.MakeNewBot = this.MakeNewBot.bind(this);
    this.newBotName = "";
    // Dashboard alert will show on the dashboard even if the modal is closed.
    // Modal alert will only show on top of the modal.
    this.state = {modalAlert: undefined, dashboardAlert: undefined};
  }

  MakeNewBot() {
    if(this.newBotName.length <= 3) {
      this.setState({modalAlert: {variant: "danger", text: "Bot name must be longer than 3 letters."}});
      return;
    }
    Axios.post("/api/bots/create", {
      "name": this.newBotName
    })
    .then((response) => {
      this.setState({dashboardAlert: {variant: "success", text: `Made new bot ${this.newBotName} with code ${response.data}`}});
      this.props.close();
    })
    .catch((err) => {
      console.log(err);
      if(err.response.status === 403) {
        this.props.history.push({
          pathname: "/",
          state: {message: {type: "danger", content: "You have been logged out"}}
        })
      } else {
        this.setState({modalAlert: {variant: "danger", text: "Failed to make new bot code."}});
      }
    });
  }

  render() {
    return(
      <>
      {this.state.dashboardAlert &&
        <Alert dismissible onClose={() => {this.setState({dashboardAlert: undefined})}} variant={this.state.dashboardAlert.variant}>{this.state.dashboardAlert.text}</Alert>
      }
      <Modal show={this.props.show} onHide={this.props.close} animation={false}>
        {this.state.modalAlert &&
          <Alert dismissible onClose={() => {this.setState({modalAlert: undefined})}} variant={this.state.modalAlert.variant}>{this.state.modalAlert.text}</Alert>
        }
        <Modal.Header>
            <Modal.Title style={{margin: "auto"}}><h4>Add a new bot</h4></Modal.Title>          
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="botName">
            <Form.Label>Bot Name</Form.Label>
            <Form.Control onChange={(e) => { this.newBotName = e.target.value }} name="name" type="text" placeholder="Bot Name" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="mt-1">
            <Button variant="success" onClick={this.MakeNewBot} className="float-left" style={{marginRight: "5px"}}>Add New Bot</Button>
            <Button variant="danger" onClick={() => { this.props.close() }} className="float-right">Close</Button>
          </div>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
}

export default withRouter(NewBotModal);
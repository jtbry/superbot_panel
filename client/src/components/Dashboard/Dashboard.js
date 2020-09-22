import React from 'react';
import {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Loading from '../Common/Loading';
import NewBotModal from './NewBotModal';
import ExistingBots from './ExistingBots';
import './Dashboard.css';
import Axios from 'axios';

function Logout(history) {
  Axios.get("/api/user/logout")
    .finally(() => {
      history.push({
        pathname: "/",
        state: {message: {type: "danger", content: "You have been logged out"}}
      })
    });
}

function Dashboard(props) {
  const [showBotModal, setShowBotModal] = useState(false);
  const [botReloads, setBotReloads] = useState(1);

  return(
    <div className="pageContent">
      <NewBotModal show={showBotModal} refreshData={() => {setBotReloads(botReloads + 1)}} close={() => {setShowBotModal(false)}} />
      <Row>
        <Col lg={9}>
          <Card>
            <Card.Header>
              Existing Bots
            </Card.Header>
            <Card.Body>
              <ExistingBots key={botReloads} />
              <div className="mt-1">
                <Button variant="success" onClick={() => {setShowBotModal(true)}} className="float-right">Add New Bot</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <Card>
            <Card.Header>
              Admin Users
            </Card.Header>
            <Card.Body>
              <Loading />
            </Card.Body>
          </Card>
          <div className="mt-1">
            <Button variant="success" className="float-left half-width">Add New User</Button>
            <Button variant="danger" onClick={() => { Logout(props.history); }} className="float-right half-width">Logout</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
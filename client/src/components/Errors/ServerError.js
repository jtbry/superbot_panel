import React from 'react';
import ServerErrorImage from '../../assets/images/server_error.svg';

function ServerError() {
  return(
    <div className="text-center">
      <img src={ServerErrorImage} className="login-logo" alt="Server Error" />
      <h2 className="mt-4"><strong>Uh oh!</strong> We ran into an error fetching that data.</h2>
      <h3>Sorry!</h3>
    </div>
  );
}

export default ServerError;
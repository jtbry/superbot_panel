import React from 'react';
import NoDataImage from '../../assets/images/no_data.svg';

function ServerError() {
  return(
    <div className="text-center">
      <img src={NoDataImage} className="login-logo" alt="No Data Found" />
      <h2 className="mt-4">We didn't find any data for that request</h2>
    </div>
  );
}

export default ServerError;
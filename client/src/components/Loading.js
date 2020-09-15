import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return(
    <div className="text-center" style={{marginTop: "10%"}}>
      <h2>Please wait...</h2>
      <Spinner className="mt-5" animation="border" role="status" style={{width: "4rem", height: "4rem"}}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;
import React from 'react';

function Bot({match}) {
  return(
    <h3>Bot {match.params.id}</h3>
  );
}

export default Bot;
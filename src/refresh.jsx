import React, { useState } from 'react';

function MyDApp() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Refresh</button>
      <p>{counter}</p>
    </div>
  );
}

export default MyDApp;

import React from 'react'

function TImer({seconds}) {
    const [counter, setCounter] = React.useState(seconds);
  
    // Third Attempts
    React.useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [counter]);
  
    return (
        <div >
            {counter > 0 ? counter : "Open"}</div>
    );
  }
export default TImer

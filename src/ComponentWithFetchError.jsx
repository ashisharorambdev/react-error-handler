import React, { useState, useEffect } from "react";

export const ComponentWithFetchError = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://non-existent-api.com/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    throw new Error("Failed to fetch data");
  }

  return (
    <div>
      <p>This component fetches data from a non-existent API</p>
      {data ? <p>Data: {data}</p> : <p>Loading...</p>}
    </div>
  );
};

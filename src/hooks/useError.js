import { useState } from 'react';

export function useError() {
  const [error, setError] = useState();

  function onSetError(errStr) {
    setError(errStr);
  }

  return { error, onSetError };
}

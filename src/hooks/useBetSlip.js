import { useContext } from 'react';

import { BetSlipContext } from '../contexts/BetSlipContext';

export function useBetSlip() {
  let context = useContext(BetSlipContext);
  if (context === undefined) {
    throw Error(
      'BetSlipContext must be used inside of a BetSlipContext Provider, ' +
        'otherwise it will not function correctly.'
    );
  }
  return context;
}

import { createContext, useState, useEffect } from 'react';
import { getOdds } from '../utils/getOdds';
import { getCalculatedOdds } from '../utils/getCalculatedOdds';
import { getCalculatedReturns } from '../utils/getCalculatedReturns';

const intialState = {
  picks: [],
};

export const BetSlipContext = createContext();

export function BetSlipContextProvider({ children }) {
  const [state, setState] = useState(intialState);
  const [stake, setStake] = useState('');
  const [returns, setReturns] = useState('');

  function onAddToSlip(pick, selection) {
    const exists = state.picks.some((currPick) => currPick.id === pick.id);
    if (!exists) {
      setState((state) => ({
        ...state,
        picks: [
          ...state.picks,
          {
            id: pick.id,
            homeTeam: pick.homeTeam,
            awayTeam: pick.awayTeam,
            selection,
            odds: getOdds(selection, pick),
          },
        ],
      }));
    }
  }

  function onRemoveFromSlip(pickId) {
    const newPicks = state.picks.filter((currPick) => currPick.id !== pickId);
    setState((state) => ({
      ...state,
      picks: newPicks,
    }));
  }

  function onSetStake(stakeVal) {
    setStake(stakeVal);
  }

  useEffect(() => {
    const newReturns = getCalculatedReturns(
      getCalculatedOdds(state.picks).toFixed(2),
      stake
    );
    setReturns(newReturns);
  }, [stake, state.picks]);

  return (
    <BetSlipContext.Provider
      value={{
        picks: state.picks,
        stake,
        returns,
        onSetStake,
        onAddToSlip,
        onRemoveFromSlip,
      }}
    >
      {children}
    </BetSlipContext.Provider>
  );
}

import { createContext, useState, useEffect } from 'react';
import { getCalculatedReturns } from '../utils/getCalculatedReturns';
import { getCalculatedOdds } from '../utils/getCalculatedOdds';
import { getOdds } from '../utils/getOdds';

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

  function onSetStake(stake) {
    setStake(stake);
  }

  useEffect(() => {
    const returns = getCalculatedReturns(
      getCalculatedOdds(state.picks).toFixed(2),
      stake
    );
    setReturns(returns);
  }, [state.picks, stake]);

  return (
    <BetSlipContext.Provider
      value={{
        picks: state.picks,
        stake,
        returns,
        onAddToSlip,
        onRemoveFromSlip,
        onSetStake,
      }}
    >
      {children}
    </BetSlipContext.Provider>
  );
}

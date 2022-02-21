import { createContext, useState } from 'react';
import { getOdds } from '../utils/getOdds';

const intialState = {
  picks: [],
};

export const BetSlipContext = createContext(intialState);

export function BetSlipContextProvider({ children }) {
  const [state, setState] = useState(intialState);

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

  return (
    <BetSlipContext.Provider
      value={{ picks: state.picks, onAddToSlip, onRemoveFromSlip }}
    >
      {children}
    </BetSlipContext.Provider>
  );
}

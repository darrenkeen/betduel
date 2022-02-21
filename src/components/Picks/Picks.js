import { useContext } from 'react';

import './Picks.css';
import { picksData } from '../../picksData';
import { BetSlipContext } from '../../contexts/BetSlipContext';
import { useBetSlip } from '../../hooks/useBetSlip';

function PicksHeading() {
  return (
    <div className="PicksHeading Picks__row">
      <div className="Picks__col">
        <h2>Home</h2>
      </div>
      <div className="Picks__col">
        <h2>Away</h2>
      </div>
      <div className="Picks__col">
        <h2>1</h2>
      </div>
      <div className="Picks__col">
        <h2>X</h2>
      </div>
      <div className="Picks__col">
        <h2>2</h2>
      </div>
    </div>
  );
}

function PicksFixture({ pick, isOdd }) {
  const { onAddToSlip, picks } = useBetSlip();
  const currentSelection = picks.find((currPick) => currPick.id === pick.id);
  return (
    <div className={`PicksFixture Picks__row ${isOdd && 'Picks__row--odd'}`}>
      <div className="Picks__col">
        <span>{pick.homeTeam}</span>
      </div>
      <div className="Picks__col">
        <span>{pick.awayTeam}</span>
      </div>
      {['home', 'draw', 'away'].map((oddsTitle) => (
        <div className="Picks__col" key={oddsTitle}>
          <button
            disabled={currentSelection}
            className={`Picks__add-btn ${
              currentSelection &&
              currentSelection.selection === oddsTitle.toUpperCase()
                ? 'Picks__add-btn--selected'
                : ''
            }`}
            onClick={() => onAddToSlip(pick, oddsTitle.toUpperCase())}
          >
            {pick[`${oddsTitle}Odds`]}
          </button>
        </div>
      ))}
    </div>
  );
}

export function Picks() {
  return (
    <div className="Picks">
      <PicksHeading />
      {picksData.map((pick, index) => (
        <PicksFixture key={pick.id} pick={pick} isOdd={index % 2} />
      ))}
    </div>
  );
}

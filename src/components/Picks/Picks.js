import './Picks.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { Loader } from '../Loader/Loader';
import { BetSlipContext } from '../../contexts/BetSlipContext';

function PicksHeading() {
  const headings = ['Home', 'Away', '1', 'X', '2'];
  return (
    <div className="PicksHeading Picks__row">
      {headings.map((heading) => (
        <div key={heading} className="Picks__col">
          <h2>{heading}</h2>
        </div>
      ))}
    </div>
  );
}

function PicksFixture({ pick, isOdd }) {
  const { onAddToSlip, picks } = useContext(BetSlipContext);
  const currentSelection = picks.find((currPick) => currPick.id === pick.id);
  return (
    <div
      className={`PicksFixture Picks__row ${isOdd ? 'Picks__row--odd' : ''}`}
    >
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

export function PicksContent({ picksData }) {
  return picksData.map((pick, index) => (
    <PicksFixture key={pick.id} pick={pick} isOdd={Boolean(index % 2)} />
  ));
}

export function PicksDataEmpty() {
  return (
    <div className="PicksDataEmpty">
      <span>No picks data</span>
    </div>
  );
}

export function Picks() {
  const [picksData, setPicksData] = useState([]);
  const [picksLoading, setPicksLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/fixtures');
        setTimeout(() => {
          setPicksData(res.data.data);
          setPicksLoading(false);
        }, 1000);
      } catch (e) {
        console.error(e);
        setPicksLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="Picks">
      <PicksHeading />
      {/* <button onClick={() => setPicksLoading(!picksLoading)}>Click me</button> */}
      {picksLoading ? (
        <Loader />
      ) : picksData.length > 0 ? (
        <PicksContent picksData={picksData} />
      ) : (
        <PicksDataEmpty />
      )}
    </div>
  );
}

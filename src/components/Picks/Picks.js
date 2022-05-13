import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import './Picks.css';
import { BetSlipContext } from '../../contexts/BetSlipContext';
import { Loader } from '../Loader/Loader';
import { useError } from '../../hooks/useError';

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

function PicksContent({ picksData }) {
  return picksData.map((pick, index) => (
    <PicksFixture key={pick.id} pick={pick} isOdd={Boolean(index % 2)} />
  ));
}

function PicksEmptyData() {
  return (
    <div className="PickEmptyData">
      <span>No picks data!</span>
    </div>
  );
}

export function Picks() {
  const [picksData, setPicksData] = useState([]);
  const [picksDataLoading, setPicksDataLoading] = useState(true);
  const { error, onSetError } = useError();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/fixtures');
        if (res.data.message === 'success') {
          setTimeout(() => {
            setPicksData(res.data.data);
            setPicksDataLoading(false);
          }, 1000);
        } else {
          console.error(res.data.message);
          onSetError(res.data.message);
          setPicksDataLoading(false);
        }
      } catch (e) {
        console.error(e);
        onSetError(e.response?.data?.message || e.message);
        setPicksDataLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="Picks">
      <PicksHeading />
      {picksDataLoading ? (
        <div className="Picks__loader-wrapper">
          <Loader />
        </div>
      ) : picksData.length > 0 ? (
        <PicksContent picksData={picksData} />
      ) : error ? (
        <div className="PicksDataError">
          <span className="error">{error}</span>
        </div>
      ) : (
        <PicksEmptyData />
      )}
    </div>
  );
}

import './:id.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../../components/Loader/Loader';
import { useError } from '../../../hooks/useError';

function SingleBetSlipPick({ pick }) {
  return (
    <div className="SingleBetSlipPick">
      <span>
        <span
          className={
            (pick.selection === 'home' || pick.selection === 'draw') && 'bold'
          }
        >
          {pick.fixture.homeTeam}
        </span>{' '}
        vs{' '}
        <span
          className={
            (pick.selection === 'away' || pick.selection === 'draw') && 'bold'
          }
        >
          {pick.fixture.awayTeam}
        </span>
      </span>
    </div>
  );
}

function SingleBetSlipPickContent({ betSlip }) {
  return (
    <div className="SingleBetSlipPickContent">
      <div className="SingleBetSlipPickContent__row">
        <span>ID</span>
        <span>{betSlip.betslipId}</span>
      </div>
      <div className="SingleBetSlipPickContent__row">
        <span>Stake</span>
        <span>£{betSlip.stake}</span>
      </div>
      <div className="SingleBetSlipPickContent__row">
        <span>Returns</span>
        <span>£{betSlip.returns}</span>
      </div>
      <div className="SingleBetSlipPickContent__picks">
        <h1>Picks</h1>
        {betSlip.picks.map((pick) => (
          <SingleBetSlipPick key={pick.fixture.homeTeam} pick={pick} />
        ))}
      </div>
    </div>
  );
}

export function SingleBetSlip() {
  const params = useParams();
  const [betSlipData, setBetSlipData] = useState();
  const [betSlipLoading, setBetSlipLoading] = useState(true);
  const { error, onSetError } = useError();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/betslip/${params.id}`);
        setBetSlipData(res.data.data);
        setBetSlipLoading(false);
      } catch (e) {
        onSetError(e.response.data?.message || e.message);
      }
    }
    fetchData();
  }, [params.id]);

  return (
    <div>
      {betSlipLoading ? (
        <Loader />
      ) : betSlipData ? (
        <SingleBetSlipPickContent betSlip={betSlipData} />
      ) : error ? (
        <span>{error}</span>
      ) : (
        <p>No data!</p>
      )}
    </div>
  );
}

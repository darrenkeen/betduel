import './singleBetSlip.css';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../components/Loader/Loader';
import { useError } from '../../../hooks/useError';
import { ModalContext } from '../../../contexts/ModalContext';

function SingleBetSlipRemove({ betSlipId }) {
  const [removeLoading, setRemoveLoading] = useState(false);
  const { onSetModalContent } = useContext(ModalContext);
  const { error, onSetError } = useError();
  const navigate = useNavigate();

  async function onRemoveBetSlip() {
    try {
      setRemoveLoading(true);
      const res = await axios.delete(`/betslip/${betSlipId}`);
      if (res.data.message === 'success') {
        onSetModalContent(`Betslip ${betSlipId} removed.`);
        navigate('/betslip');
      }
    } catch (e) {
      onSetError(e.response.data?.message || e.message);
      setRemoveLoading(false);
      console.error(e);
    }
  }
  return (
    <div className="SingleBetSlipRemove">
      <button disabled={removeLoading} onClick={onRemoveBetSlip}>
        Delete betslip
      </button>
      {error && <span>There was a problem removing betslip</span>}
    </div>
  );
}

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

function SingleBetSlipContent({ betSlip }) {
  return (
    <div className="SingleBetSlipContent">
      <div className="SingleBetSlipContent__row">
        <span>ID</span>
        <span>{betSlip.betslipId}</span>
      </div>
      <div className="SingleBetSlipContent__row">
        <span>Stake</span>
        <span>£{betSlip.stake}</span>
      </div>
      <div className="SingleBetSlipContent__row">
        <span>Returns</span>
        <span>£{betSlip.returns}</span>
      </div>
      <div className="SingleBetSlipContent__picks">
        <h1>Picks</h1>
        {betSlip.picks.map((pick) => (
          <SingleBetSlipPick key={pick.fixture.homeTeam} pick={pick} />
        ))}
        <SingleBetSlipRemove betSlipId={betSlip.betslipId} />
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
        <SingleBetSlipContent betSlip={betSlipData} />
      ) : error ? (
        <span>{error}</span>
      ) : (
        <p>No data!</p>
      )}
    </div>
  );
}

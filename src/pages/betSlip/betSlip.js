import './betSlip.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useError } from '../../hooks/useError';
import { Loader } from '../../components/Loader/Loader';

function BetSlipPageContent({ betSlips }) {
  const navigate = useNavigate();
  return (
    <div className="BetSlipPageContent">
      {betSlips.map((betSlip) => (
        <div className="BetSlipPageContent__card" key={betSlip.betslipId}>
          <div className="BetSlipPageContent__card-row">
            <span>ID</span>
            <span>{betSlip.betslipId}</span>
          </div>
          <div className="BetSlipPageContent__card-row">
            <span>Stake</span>
            <span>£{betSlip.stake}</span>
          </div>
          <div className="BetSlipPageContent__card-row">
            <span>Returns</span>
            <span>£{betSlip.returns}</span>
          </div>
          <button
            onClick={() => {
              navigate(`/betSlip/${betSlip.betslipId}`);
            }}
          >
            See picks
          </button>
        </div>
      ))}
    </div>
  );
}

function BetSlipPageEmpty() {
  return (
    <div className="BetSlipPageEmpty">
      <span>There are no betslips!...</span>
    </div>
  );
}

export function BetSlipPage() {
  const [betSlipData, setBetSlipData] = useState();
  const [betSlipLoading, setBetSlipLoading] = useState(true);
  const { error, onSetError } = useError();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/betslip');
        setBetSlipData(res.data.data);
        setBetSlipLoading(false);
      } catch (e) {
        console.error(e);
        onSetError(e.response.data?.message || e.message);
        setBetSlipLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="BetSlipPage">
      {betSlipLoading ? (
        <Loader />
      ) : betSlipData.length > 0 ? (
        <BetSlipPageContent betSlips={betSlipData} />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <BetSlipPageEmpty />
      )}
    </div>
  );
}

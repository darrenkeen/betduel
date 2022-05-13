import './betslip.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

function BetslipContent({ betslips }) {
  const navigate = useNavigate();
  return (
    <div className="BetslipPageContent">
      {betslips.map((betslip) => (
        <div className="BetslipPageContent__card" key={betslip.betslipId}>
          <div className="BetslipPageContent__card-row">
            <span>ID</span>
            <span>{betslip.betslipId}</span>
          </div>
          <div className="BetslipPageContent__card-row">
            <span>Stake</span>
            <span>{betslip.stake}</span>
          </div>
          <div className="BetslipPageContent__card-row">
            <span>Returns</span>
            <span>{betslip.returns}</span>
          </div>
          <button
            className="button"
            onClick={() => navigate(`/betslip/${betslip.betslipId}`)}
          >
            See picks
          </button>
        </div>
      ))}
    </div>
  );
}

export function BetslipPage() {
  const [betslipLoading, setBetslipLoading] = useState(true);
  const [betslipData, setBetslipData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/betslip');
        setBetslipData(res.data.data);
        setBetslipLoading(false);
      } catch (e) {
        console.error(e);
        setBetslipLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="BetslipPage">
      {betslipLoading ? (
        <Loader />
      ) : betslipData.length > 0 ? (
        <BetslipContent betslips={betslipData} />
      ) : (
        <div>
          <span>No content!</span>
        </div>
      )}
    </div>
  );
}

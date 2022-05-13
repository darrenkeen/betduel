import './singleBetslip.css';

import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useContext } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { ModalContext } from '../../contexts/ModalContext';

function SingleBetslipContent({ betslip }) {
  return (
    <div className="SingleBetslipContent">
      <div className="SingleBetslipContent__picks">
        <h1>Picks</h1>
        {betslip.picks.map((pick) => (
          <div className="SingleBetslipPick">
            <span>
              <span
                className={
                  pick.selection.toLowerCase() === 'home' ||
                  pick.selection.toLowerCase() === 'draw'
                    ? 'bold'
                    : ''
                }
              >
                {pick.fixture.homeTeam}
              </span>{' '}
              vs{' '}
              <span
                className={
                  pick.selection.toLowerCase() === 'away' ||
                  pick.selection.toLowerCase() === 'draw'
                    ? 'bold'
                    : ''
                }
              >
                {pick.fixture.awayTeam}
              </span>
            </span>
          </div>
        ))}
      </div>
      <RemoveBetslip betslipId={betslip.betslipId} />
    </div>
  );
}

function RemoveBetslip({ betslipId }) {
  const [loading, setLoading] = useState(false);
  const { onSetModalContent } = useContext(ModalContext);
  const navigate = useNavigate();

  async function onRemoveBetslip() {
    setLoading(true);
    try {
      await axios.delete(`/betslip/${betslipId}`);
      onSetModalContent(`Betslip ${betslipId} removed.`);
      navigate('/betslip');
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="RemoveBetslip">
      <button disabled={loading} className="button" onClick={onRemoveBetslip}>
        Delete betslip
      </button>
    </div>
  );
}

export function SingleBetslipPage() {
  const params = useParams();
  const [betslipData, setBetslipData] = useState();
  const [betslipLoading, setBetslipLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/betslip/${params.id}`);
        setBetslipData(res.data.data);
        setBetslipLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [params.id]);

  return (
    <div className="SingleBetslipPage">
      {betslipLoading ? (
        <Loader />
      ) : (
        <SingleBetslipContent betslip={betslipData} />
      )}
    </div>
  );
}

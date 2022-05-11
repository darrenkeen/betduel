import './BetSlip.css';
import axios from 'axios';
import { useContext, useEffect } from 'react';

import Remove from '../../assets/remove.png';
import { getTeam } from '../../utils/getTeam';
import { mapPicksData } from '../../utils/mapPicksData';
import { getCalculatedOdds } from '../../utils/getCalculatedOdds';
import { getCalculatedReturns } from '../../utils/getCalculatedReturns';
import { BetSlipContext } from '../../contexts/BetSlipContext';
import { ModalContext } from '../../contexts/ModalContext';
import { useError } from '../../hooks/useError';

function BetSlipHeading() {
  return (
    <div className="BetSlipHeading">
      <h2>Bet Slip</h2>
    </div>
  );
}

function BetSlipEmpty() {
  return (
    <div className="BetSlipEmpty">
      <p>You have no picks yet!</p>
    </div>
  );
}

function BetSlipPick({ pick }) {
  const { onRemoveFromSlip } = useContext(BetSlipContext);
  return (
    <div className="BetSlipPick">
      <div className="BetSlipPick__fixure">
        <h3>{getTeam(pick)}</h3>
        <span>
          {pick.homeTeam} vs {pick.awayTeam}
        </span>
      </div>
      <div className="BetSlipPick__odds">
        <span>{pick.odds}</span>
      </div>
      <div className="BetSlipPick__remove">
        <button onClick={() => onRemoveFromSlip(pick.id)}>
          <img src={Remove} alt="Remove from slip" width={25} />
        </button>
      </div>
    </div>
  );
}

function BetSlipTotal() {
  const { picks, stake, onSetStake } = useContext(BetSlipContext);

  return (
    <div className="BetSlipTotal">
      <div className="BetSlipTotal__acc-odds">
        <div className="BetSlipTotal__acc-odds--title">
          <h3>Acc(x{picks.length})</h3>
        </div>
        <div className="BetSlipTotal__acc-odds--title">
          <h3>{getCalculatedOdds(picks).toFixed(2)}</h3>
        </div>
      </div>
      <div className="spacer" />
      <div className="BetSlipTotal__stake">
        <div className="BetSlipTotal__stake--input">
          <span>Stake (£)</span>
          <input
            type="text"
            value={stake}
            onChange={(event) => {
              const { value } = event.target; // const value = event.target.value
              onSetStake(value);
            }}
          />
        </div>
        <div className="BetSlipTotal__stake--returns">
          <span>Returns</span>
          <h4>
            £{getCalculatedReturns(getCalculatedOdds(picks).toFixed(2), stake)}
          </h4>
        </div>
      </div>
    </div>
  );
}

export function BetSlipPlaceBet() {
  const { picks, stake, returns } = useContext(BetSlipContext);
  const { onSetShowModal } = useContext(ModalContext);
  const { error, onSetError } = useError();

  async function onSubmitBet() {
    try {
      const res = await axios.post('/betslip/create', {
        picks: mapPicksData(picks),
        stake,
        returns,
      });
      if (res.data.message === 'success') {
        onSetShowModal(true);
      } else {
        onSetError(res.data.message);
      }
    } catch (e) {
      onSetError(e.response.data?.message || e.message);
      console.error(e);
    }
  }

  useEffect(() => {
    onSetError('');
  }, [picks, stake]);

  return (
    <div className="BetSlipPlaceBet">
      <div className="BetSlipPlaceBet__button-wrapper">
        <button disabled={!stake || picks.length === 0} onClick={onSubmitBet}>
          Place bet
        </button>
      </div>
      {error && (
        <div className="BetSlipPlaceBet__error-wrapper">
          <p className="error">{error}</p>
        </div>
      )}
    </div>
  );
}

export function BetSlip() {
  const { picks } = useContext(BetSlipContext);

  return (
    <div className="BetSlip">
      <BetSlipHeading />
      {picks.length < 1 && <BetSlipEmpty />}
      {picks.map((pick) => (
        <BetSlipPick pick={pick} key={pick.id} />
      ))}
      <BetSlipTotal />
      <BetSlipPlaceBet />
    </div>
  );
}

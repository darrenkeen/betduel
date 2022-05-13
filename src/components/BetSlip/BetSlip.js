import './BetSlip.css';
import axios from 'axios';
import Remove from '../../assets/remove.png';
import { useState, useContext, useEffect } from 'react';
import { getTeam } from '../../utils/getTeam';
import { getCalculatedOdds } from '../../utils/getCalculatedOdds';
import { getCalculatedReturns } from '../../utils/getCalculatedReturns';
import { BetSlipContext } from '../../contexts/BetSlipContext';
import { mapPicksdata } from '../../utils/mapPicksData';
import { useError } from '../../hooks/useError';
import { ModalContext } from '../../contexts/ModalContext';

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
  const { picks, stake, returns, onSetStake } = useContext(BetSlipContext);

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
          <h4>£{returns}</h4>
        </div>
      </div>
    </div>
  );
}

function BetSlipPlaceBet() {
  const { picks, stake, returns } = useContext(BetSlipContext);
  const { onSetModalContent } = useContext(ModalContext);
  const { error, onSetError } = useError();

  async function onPlaceBet() {
    try {
      const res = await axios.post('/betslip/create', {
        picks: mapPicksdata(picks),
        stake,
        returns,
      });
      if (res.data.message === 'success') {
        onSetModalContent('Betslip created');
      } else {
        onSetError(res.data.message);
      }
      console.log(res);
    } catch (e) {
      console.error(e);
      onSetError(e.response?.data?.message || e.message);
    }
  }

  return (
    <div className="BetSlipPlaceBet">
      <div className="BetSlipPlaceBet__button-wrapper">
        <button className="button" onClick={onPlaceBet}>
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

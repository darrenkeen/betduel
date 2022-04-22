import './BetSlip.css';
import Remove from '../../assets/remove.png';
import { useState, useContext } from 'react';
import { getTeam } from '../../utils/getTeam';
import { getCalculatedOdds } from '../../utils/getCalculatedOdds';
import { getCalculatedReturns } from '../../utils/getCalculatedReturns';
import { BetSlipContext } from '../../contexts/BetSlipContext';

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
  const [stake, setStake] = useState('');
  const { picks } = useContext(BetSlipContext);

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
              setStake(value);
            }}
          />
        </div>
        <div className="BetSlipTotal__stake--returns">
          <span>Returns</span>
          <h4>
            {getCalculatedReturns(getCalculatedOdds(picks).toFixed(2), stake)}
          </h4>
        </div>
      </div>
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
    </div>
  );
}

import './home.css';

import { BetSlip } from '../../components/BetSlip/BetSlip';
import { Picks } from '../../components/Picks/Picks';

export function HomePage() {
  return (
    <div className="HomePage">
      <div className="picks-container">
        <Picks />
      </div>
      <div className="bet-slip-container">
        <BetSlip />
      </div>
    </div>
  );
}

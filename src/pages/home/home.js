import './home.css';

import { Picks } from '../../components/Picks/Picks';
import { BetSlip } from '../../components/BetSlip/BetSlip';

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

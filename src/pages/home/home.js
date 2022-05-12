import './home.css';

import { Picks } from '../../components/Picks/Picks';
import { BetSlip } from '../../components/BetSlip/BetSlip';

export function HomePage() {
  return (
    <div className="HomePage">
      <div className="HomePage__picks-container">
        <Picks />
      </div>
      <div className="HomePage__bet-slip-container">
        <BetSlip />
      </div>
    </div>
  );
}

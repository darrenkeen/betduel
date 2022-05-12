import { Link } from 'react-router-dom';
import Logo from '../../assets/betduel-logo.png';
import './Header.css';

export function Header() {
  return (
    <div className="Header">
      <Link to="/">
        <img src={Logo} alt="BetDuel" width={150} />
      </Link>
      <Link to="/">Home</Link>
      <Link to="betSlip">Betslip</Link>
    </div>
  );
}

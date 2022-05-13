import Logo from '../../assets/betduel-logo.png';
import { Link } from 'react-router-dom';
import './Header.css';

export function Header() {
  return (
    <div className="Header">
      <Link to="/">
        <img src={Logo} alt="BetDuel" width={150} />
      </Link>
      <Link to="/">Home</Link>
      <Link to="betslip">Betslip</Link>
    </div>
  );
}

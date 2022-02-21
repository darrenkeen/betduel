import Logo from '../../assets/betduel-logo.png';
import './Header.css';

export function Header() {
  return (
    <div className="Header">
      <img src={Logo} alt="BetDuel" width={150} />
    </div>
  );
}

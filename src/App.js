import './App.css';
import { Header } from './components/Header/Header';
import { Picks } from './components/Picks/Picks';
import { BetSlip } from './components/BetSlip/BetSlip';
import { BetSlipContextProvider } from './contexts/BetSlipContext';

function App() {
  return (
    <BetSlipContextProvider>
      <div className="App">
        <Header />
        <div className="main">
          <div className="picks-container">
            <Picks />
          </div>
          <div className="bet-slip-container">
            <BetSlip />
          </div>
        </div>
      </div>
    </BetSlipContextProvider>
  );
}

export default App;

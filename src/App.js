import './App.css';
import { Header } from './components/Header/Header';
import { Picks } from './components/Picks/Picks';
import { BetSlip } from './components/BetSlip/BetSlip';
import { BetSlipContextProvider } from './contexts/BetSlipContext';
import { Modal } from './components/Modal/Modal';
import { ModalContextProvider } from './contexts/ModalContext';

function App() {
  return (
    <BetSlipContextProvider>
      <ModalContextProvider>
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
          <Modal />
        </div>
      </ModalContextProvider>
    </BetSlipContextProvider>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/home/home';
import { BetSlipContextProvider } from './contexts/BetSlipContext';
import { Modal } from './components/Modal/Modal';
import { ModalContextProvider } from './contexts/ModalContext';
import { BetSlipPage } from './pages/betSlip/betSlip';
import { SingleBetSlip } from './pages/betSlip/:id/:id';

function App() {
  return (
    <Router>
      <BetSlipContextProvider>
        <ModalContextProvider>
          <div className="App">
            <Header />
            <div className="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="betSlip" element={<BetSlipPage />} />
                <Route path="betSlip/:id" element={<SingleBetSlip />} />
              </Routes>
            </div>
            <Modal />
          </div>
        </ModalContextProvider>
      </BetSlipContextProvider>
    </Router>
  );
}

export default App;

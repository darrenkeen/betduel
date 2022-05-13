import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { BetSlipContextProvider } from './contexts/BetSlipContext';
import { ModalContextProvider } from './contexts/ModalContext';
import { Modal } from './components/Modal/Modal';
import { HomePage } from './pages/home/home';
import { BetslipPage } from './pages/betslip/betslip';
import { SingleBetslipPage } from './pages/singleBetslip/singleBetslip';

function App() {
  return (
    <BrowserRouter>
      <ModalContextProvider>
        <BetSlipContextProvider>
          <div className="App">
            <Header />
            <div className="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="betslip">
                  <Route index element={<BetslipPage />} />
                  <Route path=":id" element={<SingleBetslipPage />} />
                </Route>
              </Routes>
            </div>
            <Modal />
          </div>
        </BetSlipContextProvider>
      </ModalContextProvider>
    </BrowserRouter>
  );
}

export default App;

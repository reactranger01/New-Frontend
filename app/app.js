import './i18n';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import createReducer from './redux/reducers';
import rootSaga from './redux/rootSaga';
import {
  AccountStatement,
  AddAccount,
  BankDetails,
  Cricket,
  CricketMarket,
  Deposit,
  DesktopHome,
  EditBankAccountDetails,
  EditStakes,
  Football,
  FootballMarket,
  LayoutThree,
  MobCricket,
  MobFootball,
  MobHome,
  MobLayout,
  MobTennis,
  MyBets,
  NotFound,
  ProfitAndLoss,
  Settings,
  Sidebar,
  Tennis,
  TennisMarket,
  TransactionsPage,
  Withdraw,
  NotificationPage,
  LayoutTwo,
  OpenBets,
} from './containers/pageListAsync';
import {
  ImageUpload,
  ModalManager,
  NoMarketAvailable,
  ScrollToTop,
} from './components';
import PrivateRoute from './containers/auth/PrivateRoute';
import { useMediaQuery } from '@mui/material';

const sagaMiddleware = createSagaMiddleware();
const reducer = createReducer();
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});

sagaMiddleware.run(rootSaga);

function App() {
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ModalManager />
        <ScrollToTop />

        <Routes>
          <Route path="/mobile" element={<MobLayout />}>
            <Route index element={<MobHome />} />
            <Route path="cricket" element={<MobCricket />} />
            <Route path="football" element={<MobFootball />} />
            <Route path="tennis" element={<MobTennis />} />
          </Route>
          <Route path="/" element={isMobile ? <MobLayout /> : <Sidebar />}>
            <Route index element={<DesktopHome />} />
            <Route path="/cricket" element={<Cricket />} />
            <Route
              path="/cricket/market/:eventId"
              element={isMobile ? <MobCricket /> : <CricketMarket />}
            />
            <Route path="/tennis" element={<Tennis />} />
            <Route
              path="/tennis/market/:eventId"
              element={isMobile ? <MobTennis /> : <TennisMarket />}
            />
            <Route path="/football" element={<Football />} />
            <Route
              path="/football/market/:eventId"
              element={isMobile ? <MobFootball /> : <FootballMarket />}
            />
            <Route path="no-market" element={<NoMarketAvailable />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <LayoutTwo />
              </PrivateRoute>
            }
          >
            <Route index element={<MyBets />} />
            <Route path="bets/1" element={<OpenBets />} />
            <Route path="bets/2" element={<MyBets />} />
            <Route path="change-password" element={<Settings />} />
            <Route path="notifications" element={<NotificationPage />} />

            <Route path="bank-details" element={<BankDetails />} />
            <Route path="bank-details/add-account" element={<AddAccount />} />
            <Route
              path="bank-details/edit-bank-account-details"
              element={<EditBankAccountDetails />}
            />
          </Route>
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <LayoutThree />
              </PrivateRoute>
            }
          >
            <Route index element={<TransactionsPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="account-statement" element={<AccountStatement />} />
            <Route path="profit-loss" element={<ProfitAndLoss />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdrawal" element={<Withdraw />} />
            <Route path="edit-stakes" element={<EditStakes />} />
          </Route>

          <Route path="/*" element={<NotFound />} />

          <Route path="/img" element={<ImageUpload />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  );
}

export default App;

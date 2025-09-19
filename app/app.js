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
  // Casino,
  Cricket,
  CricketMarket,
  Deposit,
  EditBankAccountDetails,
  Football,
  FootballMarket,
  // Home,
  // Landing,
  MobCricket,
  MobFootball,
  MobHome,
  MobLayout,
  MobTennis,
  // Login,
  MyBets,
  NotFound,
  ProfitAndLoss,
  // RulesRegulation,
  Settings,
  SettingsMobile,
  Sidebar,
  Tennis,
  TennisMarket,
  UpdateModal,
  Withdraw,
} from './containers/pageListAsync';
import { ImageUpload, NoMarketAvailable } from './components';
import PrivateRoute from './containers/auth/PrivateRoute';
import { useMediaQuery } from '@mui/material';
import DesktopHome from './containers/DesktopHome';

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
        <Routes>
          <Route path="/mobile" element={<MobLayout />}>
            <Route index element={<MobHome />} />
            <Route path="cricket" element={<MobCricket />} />
            <Route path="football" element={<MobFootball />} />
            <Route path="tennis" element={<MobTennis />} />
          </Route>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={isMobile ? <MobLayout /> : <Sidebar />}>
            {/* <Route index element={isMobile ? <MobHome /> : <Home />} />
            <Route path="rules-regulation" element={<RulesRegulation />} /> */}
            {/* <Route index element={<Casino />} /> */}
            <Route index element={<DesktopHome />} />
            <Route path="/cricket" element={<Cricket />} />
            <Route path="change-password-first" element={<UpdateModal />} />
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
            <Route
              path="my-bets"
              element={
                <PrivateRoute>
                  <MyBets />
                </PrivateRoute>
              }
            />
            <Route
              path="settings-stake"
              element={
                <PrivateRoute>
                  <SettingsMobile />
                </PrivateRoute>
              }
            />
            <Route
              path="account-statement"
              element={
                <PrivateRoute>
                  <AccountStatement />
                </PrivateRoute>
              }
            />
            <Route
              path="profit-loss"
              element={
                <PrivateRoute>
                  <ProfitAndLoss />
                </PrivateRoute>
              }
            />
            <Route
              path="settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="dashboard/bank-details" element={<BankDetails />} />
            <Route
              path="dasboard/bank-details/add-account"
              element={<AddAccount />}
            />
            <Route
              path="dashboard/bank-details/edit-bank-account-details"
              element={<EditBankAccountDetails />}
            />
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

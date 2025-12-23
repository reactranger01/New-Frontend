import React from 'react';
import { Loading } from '@/components';
import loadable from '../utils/loadable';

// Landing Page
export const Landing = loadable(() => import('./Landing'), {
  fallback: <Loading />,
});
export const DesktopHome = loadable(() => import('./DesktopHome'), {
  fallback: <Loading />,
});
//Login Page
export const LoginModal = loadable(() => import('./Pages/LoginModal'), {
  fallback: <Loading />,
});
//Sidebar Page
export const Sidebar = loadable(() => import('./Sidebar'), {
  fallback: <Loading />,
});
//Home Page
export const Home = loadable(() => import('./Pages/Home'), {
  fallback: <Loading />,
});
//Cricket Page
export const Cricket = loadable(() => import('./Pages/Cricket'), {
  fallback: <Loading />,
});
//Football Page
export const Football = loadable(() => import('./Pages/Football'), {
  fallback: <Loading />,
});
//Tennis Page
export const Tennis = loadable(() => import('./Pages/Tennis'), {
  fallback: <Loading />,
});
//Casino Page
export const Casino = loadable(() => import('./Pages/Casino'), {
  fallback: <Loading />,
});
//Cricket Market Page
export const CricketMarket = loadable(
  () => import('./singlebet/CricketMarket'),
  {
    fallback: <Loading />,
  },
);
//Cricket Market Page
export const TennisMarket = loadable(() => import('./singlebet/TennisMarket'), {
  fallback: <Loading />,
});
//Cricket Market Page
export const FootballMarket = loadable(
  () => import('./singlebet/FootballMarket'),
  {
    fallback: <Loading />,
  },
);
// MyBets Pages
export const MyBets = loadable(() => import('./Pages/MyBets'), {
  fallback: <Loading />,
});
// ProfitAndLoss Pages
export const ProfitAndLoss = loadable(() => import('./Pages/ProfitAndLoss'), {
  fallback: <Loading />,
});
// AccountStatement Pages
export const AccountStatement = loadable(
  () => import('./Pages/AccountStatement'),
  {
    fallback: <Loading />,
  },
);
// Settings Pages
export const Settings = loadable(() => import('./Pages/Settings'), {
  fallback: <Loading />,
});
// Deposit Pages
export const Deposit = loadable(() => import('./Pages/Deposit'), {
  fallback: <Loading />,
});
// Withdraw Pages
export const Withdraw = loadable(() => import('./Pages/Withdraw'), {
  fallback: <Loading />,
});
// Static Pages
export const NotFound = loadable(() => import('./NotFound'), {
  fallback: <Loading />,
});
export const BankDetails = loadable(() => import('./BankDetails'), {
  fallback: <Loading />,
});
export const AddAccount = loadable(() => import('./BankDetails/AddAccount'), {
  fallback: <Loading />,
});
export const EditBankAccountDetails = loadable(
  () => import('./BankDetails/EditBankAccountDetails'),
  {
    fallback: <Loading />,
  },
);

// MOBILE
export const MobLayout = loadable(() => import('./Mobile/MobLayout'), {
  fallback: <Loading />,
});
export const MobHome = loadable(() => import('./Mobile/MobHome'), {
  fallback: <Loading />,
});
export const MobCricket = loadable(() => import('./Mobile/MobCricket'), {
  fallback: <Loading />,
});
export const MobFootball = loadable(() => import('./Mobile/MobFootball'), {
  fallback: <Loading />,
});
export const MobTennis = loadable(() => import('./Mobile/MobTennis'), {
  fallback: <Loading />,
});

export const MobileFixtureCricket = loadable(
  () => import('./Mobile/MobileFixtureCricket'),
  {
    fallback: <Loading />,
  },
);

export const MobileFixtureFootball = loadable(
  () => import('./Mobile/MobileFixtureFootball'),
  {
    fallback: <Loading />,
  },
);

export const MobileGameHeader = loadable(
  () => import('./Mobile/MobileGameHeader'),
  {
    fallback: <Loading />,
  },
);

export const MobileSessionBetRisk = loadable(
  () => import('./Mobile/MobileSessionBetRisk'),
  {
    fallback: <Loading />,
  },
);

export const MobileFixtureTennis = loadable(
  () => import('./Mobile/MobileFixtureTennis'),
  {
    fallback: <Loading />,
  },
);

export const SettingsMobile = loadable(
  () => import('./Mobile/SettingsMobile'),
  {
    fallback: <Loading />,
  },
);
export const UpdateModal = loadable(() => import('./Pages/UpdateModal'), {
  fallback: <Loading />,
});
export const RulesRegulation = loadable(() => import('./RulesRegulation'), {
  fallback: <Loading />,
});
export const EditStakes = loadable(() => import('./EditStakes'), {
  fallback: <Loading />,
});
export const LayoutThree = loadable(() => import('./LayoutThree'), {
  fallback: <Loading />,
});
export const TransactionsPage = loadable(
  () => import('./Pages/TransactionsPage'),
  {
    fallback: <Loading />,
  },
);
export const OpenBets = loadable(() => import('./Pages/OpenBets'), {
  fallback: <Loading />,
});

export const LayoutTwo = loadable(() => import('./LayoutTwo'), {
  fallback: <Loading />,
});
export const NotificationPage = loadable(() => import('./NotificationPage'), {
  fallback: <Loading />,
});

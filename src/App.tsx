import TimerStarter from './components/TimerStarter';

import './App.css';
import LiveTimer from './components/LiveTimer';
import ManageTimer from './components/ManageTimer';
import Analyse from './components/Analyse';

import { useStoreState } from 'easy-peasy';
import { useState } from 'react';

function App() {
  const startSession = useStoreState((state: any) => state.startSession.startState)
  return (
    <div className=" w-2/3 m-auto py-10">

      {!startSession ?
        <>
          <TimerStarter />
          <ManageTimer />
          <Analyse />
        </>
        :
        <LiveTimer />
      }




    </div>
  );
}

export default App;

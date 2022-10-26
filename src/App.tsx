import TimerStarter from './components/TimerStarter';

import './App.css';
import LiveTimer from './components/LiveTimer';
import ManageTimer from './components/ManageTimer';
import Analyse from './components/Analyse';
import { db } from './lib/localDb';
import { useLiveQuery } from 'dexie-react-hooks';
import { useStoreState, useStoreActions } from './lib/store';

function App() {
  const startSession = useStoreState((state) => state.startSession.startState)
  const { setDefaultDayGoal } = useStoreActions((actions) => actions.defaultData)
  const { setDefaultSessionTime } = useStoreActions((actions) => actions.defaultData)
  useLiveQuery(
    async () => {
      const res = await db.defaultData.toArray()
      if (!res?.length) {
        db.defaultData.put({
          id: 1,
          defaultDayGoal: 8,
          defaultSessionTime: 30
        })
      } else {
        setDefaultDayGoal(res[0].defaultDayGoal)
        setDefaultSessionTime(res[0].defaultSessionTime)
      }
    }
  );



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

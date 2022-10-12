import { action, Action, createStore, createTypedHooks } from 'easy-peasy';

interface startSessionModel {
    startState: boolean;
    startSessionAction: Action<startSessionModel>;
}

const startSession: startSessionModel = {
    startState: false,
    startSessionAction: action((state) => {
        state.startState = !state.startState
    })
}

interface sessionTimeModel {
    sessionTimeValue: number;
    sessionTimeIncrement: Action<sessionTimeModel>
    sessionTimeDecrement: Action<sessionTimeModel>
}

const sessionTime: sessionTimeModel = {
    sessionTimeValue: 30,
    sessionTimeIncrement: action((state) => {
        state.sessionTimeValue = state.sessionTimeValue + 15
    }),

    sessionTimeDecrement: action((state) => {
        if (state.sessionTimeValue > 15) {
            state.sessionTimeValue = state.sessionTimeValue - 15
        }
    })
}

interface AllSessionsTimeModel {
    AllSessionsTimeValue: number;
    AllSessionsTimeIncrement: Action<AllSessionsTimeModel, number>
}
const AllSessionsTime: AllSessionsTimeModel = {
    AllSessionsTimeValue: 0,
    AllSessionsTimeIncrement: action((state, payload) => {
        //payload is the value of secondesPassed (in secondes)
        let TimePassedInMinutes = Math.round(payload / 60)
        state.AllSessionsTimeValue = state.AllSessionsTimeValue + TimePassedInMinutes
        console.log(state.AllSessionsTimeValue)
    })
}

interface stateModel {
    actualSessionTime: number,
    restTime: number,
    AllRestTime: number,
    goal: number,
}
const state: stateModel = {
    actualSessionTime: 0,
    restTime: 0,
    AllRestTime: 0,
    goal: 8,
}


interface storeModel {
    startSession: startSessionModel;
    sessionTime: sessionTimeModel;
    AllSessionsTime: AllSessionsTimeModel;
    state: stateModel
}
const model: storeModel = {
    startSession,
    sessionTime,
    AllSessionsTime,
    state
}



const store = createStore(model);

const typedHooks = createTypedHooks<storeModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store
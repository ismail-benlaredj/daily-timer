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




interface stateModel {
    actualSessionTime: number,
    restTime: number,
    AllSessionsTime: number,
    AllRestTime: number,
    goal: number,
}
const state: stateModel = {

    actualSessionTime: 0,
    restTime: 0,
    AllSessionsTime: 0,
    AllRestTime: 0,
    goal: 8,
}


interface storeModel {
    startSession: startSessionModel;
    sessionTime: sessionTimeModel;
    state: stateModel
}
const model: storeModel = {
    startSession,
    sessionTime,
    state
}



const store = createStore(model);

const typedHooks = createTypedHooks<storeModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store
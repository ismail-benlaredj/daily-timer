import {
    action,
    Action,
    createStore,
    createTypedHooks,
    thunkOn,
    ThunkOn,
    Computed,
    computed
} from 'easy-peasy';
import { getDay, updateDay } from './localDb';

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
    setDefaultSessionTime: Action<this, number>;

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
    }),
    setDefaultSessionTime: action((state, payload) => {
        state.sessionTimeValue = payload
    })

}

interface AllSessionsTimeModel extends stateModel {
    AllSessionsTimeValue: number;
    AllSessionsTimeIncrement: Action<AllSessionsTimeModel, number>
    saveAllSessions: ThunkOn<AllSessionsTimeModel>
}
const AllSessionsTime: AllSessionsTimeModel = {
    AllSessionsTimeValue: 0,
    AllSessionsTimeIncrement: action((state, payload) => {
        //payload is the value of secondesPassed (in secondes)
        let TimePassedInMinutes = Math.round(payload / 60)
        state.AllSessionsTimeValue = state.AllSessionsTimeValue + TimePassedInMinutes
    }),
    saveAllSessions: thunkOn(
        (actions) => actions.AllSessionsTimeIncrement,
        async (actions, payload, { getStoreState, getState }) => {
            const { state }: any = getStoreState()
            const { AllSessionsTimeValue } = getState()
            const id = await state.computedDayId
            updateDay(id, AllSessionsTimeValue, 'AllSessionsTimeValue')
        }
    )
}

interface AllrestTimeModel {
    AllrestTimeValue: number;
    AllrestTimeIncrement: Action<AllrestTimeModel, number>
}

const restTime: AllrestTimeModel = {
    AllrestTimeValue: 0,
    AllrestTimeIncrement: action((state, payload) => {
        state.AllrestTimeValue = payload
    })
}

interface goalModel {
    goalValue: number;
    setGoal: Action<this, number>;
}

const goal: goalModel = {
    goalValue: 8,
    setGoal: action((state, payload) => {
        state.goalValue = payload
    }),

}

interface stateModel {
    updateDayId?: Action<this, number>;
    computedDayId?: Computed<stateModel, Promise<number | undefined>>
    actualSessionTime?: number
    AllRestTime?: number
}
const state: stateModel = {
    computedDayId: computed(async (state) => {
        const day = await getDay()
        return day?.id
    }),
    actualSessionTime: 0,
    AllRestTime: 0,
}


interface storeModel {
    startSession: startSessionModel;
    sessionTime: sessionTimeModel;
    AllSessionsTime: AllSessionsTimeModel;
    restTime: AllrestTimeModel;
    goal: goalModel;
    state: stateModel
}
const model: storeModel = {
    startSession,
    sessionTime,
    AllSessionsTime,
    restTime,
    goal,
    state,
}



const store = createStore(model);

const typedHooks = createTypedHooks<storeModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store
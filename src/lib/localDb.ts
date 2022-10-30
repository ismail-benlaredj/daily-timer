import Dexie, { Table } from 'dexie';

export interface Day {
    id?: number;
    date: {
        day: number,
        month: number,
        year: number
    };
    dayGoal: number;
    AllSessionsTimeValue: number;
    restTime: number;
    percentage: number;
    goalReached: boolean;
}

export interface defaultDataModel {
    id?: number;
    defaultDayGoal: number;
    defaultSessionTime: number;
}

// const DEFAULT_DAY_GOAL = 8;
// const DEFAULT_SESSION_TIME = 30;

export class dataBase extends Dexie {

    Days!: Table<Day>;
    defaultData!: Table<defaultDataModel>;
    constructor() {
        super('database');
        this.version(1).stores({
            Days: '++id, date, dayGoal,workedTime,restTime,percentage,goalReached',// Primary key and indexed props
            defaultData: 'id,defaultDayGoal,defaultSessionTime ' // Primary key and indexed props
        });
    }

}

export const db = new dataBase();

export const updateDefaultData = async (defaultDayGoal: number, defaultSessionTime: number) => {
    await db.defaultData.update(1, { defaultDayGoal, defaultSessionTime });
}

export const getDefaultData = async () => {
    const res = await db.defaultData.toArray();

    return {
        defaultDayGoal: res[0].defaultDayGoal,
        defaultSessionTime: res[0].defaultSessionTime
    }
}
export const addNewDay = async () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const defaultGoal = await db.defaultData.toArray()
    const res = await getDay()

    if (res && res.date.day === day && res.date.month === month && res.date.year === year) {
        return;
    } else {
        await db.Days.put({
            date: { day, month, year },
            dayGoal: defaultGoal[0].defaultDayGoal,
            AllSessionsTimeValue: 0,
            restTime: 0,
            percentage: 0,
            goalReached: false
        });
    }
}

export const getDay = () => {
    return db.Days.orderBy('id').last()
}

export const updateDay = async (id: number | undefined, payload: number, key: string) => {
    console.log({ [key]: payload });
    await db.Days.update(id || 0, { [key]: payload });
}
import Dexie, { Table } from 'dexie';

export interface Day {
    id?: number;
    date: string;
    dayGoal: number;
    workedTime: string;
    restTime: string;
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






// export class dataBase extends Dexie {
//     // 'friends' is added by dexie when declaring the stores()
//     // We just tell the typing system this is the case
//     friends!: Table<Friend>;
//     test: () => void
//     constructor() {
//         super('database');
//         this.version(1).stores({
//             friends: '++id, name, age' // Primary key and indexed props
//         });
//         this.test = async () => {
//             await db.friends.add({
//                 name: 'ismail',
//                 age: 0
//             });
//         }
//     }
// }

// export const db = new dataBase();
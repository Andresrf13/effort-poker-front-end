import { User } from "./user";
import { EstimationMethods } from "./estimationMethods";
import { StateRoom } from "./stateRoom";


export class Room {
    id: string;
    name: string;
    users: User[];
    owner: User | null;
    createdAt: Date;
    estimationMethod: EstimationMethods;
    stateRoom: StateRoom;


    constructor(id?: string, name?: string, users?: User[], owner?: User, createdAt?: Date, estimationMethod?: EstimationMethods, state?: StateRoom) {
        this.id = id || '';
        this.name = name || '';
        this.users = users || [];
        this.owner = owner || null;
        this.createdAt = createdAt || new Date();
        this.estimationMethod = estimationMethod || EstimationMethods.fibonacci;
        this.stateRoom = state ?? StateRoom.vote;
    }
}
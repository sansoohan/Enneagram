import { Injectable } from "@angular/core";
import { User } from "./user.model";

import { USER } from "./mock-rooms";

@Injectable()
export class UserHomeService {
    me: User;
    constructor() {
        this.me = USER;
    }
}
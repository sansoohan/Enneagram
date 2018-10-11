import { AngularFireObject } from 'angularfire2/database';
export class ChatMessage {
    $key?: string;
    email?: string;
    userName?: AngularFireObject<{}>;
    message?: string;
    timeSent?: string;
}

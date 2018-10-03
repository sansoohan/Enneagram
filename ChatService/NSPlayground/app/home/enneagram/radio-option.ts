
export class RadioOption {
    group: string;
    text: string;
    selected: boolean = false;

    constructor(group: string, text: string) {
        this.text = text;
        this.group = group;
    }
}
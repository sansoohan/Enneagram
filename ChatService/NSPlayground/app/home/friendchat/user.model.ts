export class User {
    public index: {
        email: string,
        name: string,
        profilePicsrc: string,
        backgroundPicsrc: string,
        gender: string,
        enneagramNumber: number,
    }
    public home: {
        enneagram: {
            behavior: string,
            emotion: string,
            thought: string,   
        }
    }
}
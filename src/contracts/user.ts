export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    status: string = '';
    vote: string = '';
    class: string|null = null;

    constructor(id?: string, name?: string, email?: string, password?: string) {
        this.id = id || '';
        this.name = name || '';
        this.email = email || '';
        this.password = password || '';
    }
}
import axios from 'axios';

export class BWTerminalUser {
    constructor() {
        this.controller = 'User';
        this.id = null;
        this.created = null;
        this.created_by = null;
        this.modified = null;
        this.modified_by = null;
        this.username = null;
        this.password = null;
        this.name = null;
        this.lastname = null;
        this.email = null;
        this.default_company = null;
        this.default_branch = null;
        this.is_active = false;
    }

    async login(body) {
        let response = await axios.post(this.controller, body);
        return response.data;
    }
}

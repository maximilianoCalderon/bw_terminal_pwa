import axios from 'axios';

export class BWMITConcept {
    constructor() {
        this.controller = 'Concept';
        this.id = null;
        this.id_company = null;
        this.id_branch = null;
        this.id_bw_mit_concept_classification = null;
        this.name = null;
        this.key_name = null;
        this.created = null;
        this.created_by = null;
        this.modified = null;
        this.modified_by = null;
    }

    async get(id_company, id_branch) {
        let response = await axios.get(this.controller + '/terminal', {
            headers: {
                company: id_company,
                branch: id_branch
            }
        });
        return response.data;
    }

}

import axios from 'axios';

export class BWMITSale {
    constructor() {
        this.controller = 'MIT';
        this.id = null;
        this.created = null;
        this.created_by = null;
        this.modified = null;
        this.modified_by = null;
        this.TrxAID = null;
        this.TrxAmount = null;
        this.TrxArqc = null;
        this.TrxCard = null;
        this.TrxCardBank = null;
        this.TrxCardBrand = null;
        this.TrxCardInstrument = null;
        this.TrxCurrency = null;
        this.TrxDate = null;
        this.TrxDescription = null;
        this.TrxDevice = null;
        this.TrxMerchant = null;
        this.TrxOriginalNumber = null;
        this.TrxPaymentMode = null;
        this.TrxReference = null;
        this.TrxResult = null;
        this.TrxResultCode = null;
        this.TrxTime = null;
        this.TrxUrl = null;
        this.GetNetLicence = null;
        this.integrationMode = null;
    }

    saveState(state, sale) {
        axios.post(this.controller + '/sale/response/' + state, sale);
    }

    async sale() {
        // let response = await axios.post(this.controller + '/sale', this);
        let response = await axios.post("https://integration.pos.io/payment/sale", {
            "License": "ZTk4MzIzYzAtMTM1Ny00YTE4LWEwYTYtM2EyYTNlMTNkYzBi",
            "TrxCurrency": this.TrxCurrency,
            "TrxReference": this.TrxReference,
            "TrxAmount": this.TrxAmount,
            "TrxDevice": this.TrxDevice
        });
        console.log(response);
        console.log(response.data);
        return response.data;
    }

    async updateConcept(TrxOriginalNumber, TrxMerchant, TrxConcept) {
        let response = await axios.put(this.controller + '/sale/concept', {
            TrxOriginalNumber: TrxOriginalNumber,
            TrxMerchant: TrxMerchant,
            TrxConcept: TrxConcept
        });
        return response.data;
    }

    async refund() {
        let response = await axios.post(this.controller + '/refund', this);
        return response.data;
    }

    async retrieve() {
        let response = await axios.get(this.controller + '/sale/' + this.id);
        return response.data;
    }

    async data(params) {
        let query = "?";
        if (params) {
           Object.keys(params).forEach(prop => {
               if (params[prop] != null) {
                   query = query + prop + "=" + params[prop] + "&";
               }
           });
           query = query.substring(0, query.length - 1);
        }else {
            query = "";
        }
        
        let response = await axios.get(this.controller + "/data" + query, {
            headers: {
                user: this.user
            }
        });
        return response.data;
    }
}

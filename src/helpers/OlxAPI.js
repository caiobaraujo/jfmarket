import Cookies from "js-cookie";
import qs from 'qs';

const BASEAPI = 'http://localhost:5000';

const apiFetchFile = async (endpoint, body ) => { // tentar depois body = []
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.append('token', token);
        }
    }
  
    const res = await fetch(BASEAPI + endpoint, {
      method: 'POST',
      body
    });
  
    const json = await res.json();
    /*
    if (json.notallowed) {
      window.location.href = '/signin';
      return;
    };
    */
    
    
  
    return json;
}

const apiFetchPost = async (endpoint, body) => {

    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            
        },
        body: JSON.stringify(body)
    });
        const json = await res.json();

        if(json.notallowed) {
            window.location.href = '/signin';
            return
        }
        return json;
    }

    const apiFetchGet = async (endpoint, body = []) => {

        if(!body.token) {
            let token = Cookies.get('token');
            if(token) {
                body.token = token;
            }
        }
        const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
            const json = await res.json();
    
            if(json.notallowed) {
                window.location.href = '/signin';
                return
            }
            return json;
        }


const OlxAPI =  {

    login: async (email, password) => {
        
        const json = await apiFetchPost(
            '/user/signin',
            { email, password },

        );
        return json;
    },

    register: async (name, stateLoc, email, password) => {
        const json = await apiFetchPost(
            '/user/signup',
            { name, state: stateLoc, email, password },
        );
        return json;
    },

    getStates: async () => {
        const json = await apiFetchGet(
            '/states',
        );
        
        return json;
    } ,
    
    getCategories: async () => { 
        const json = await apiFetchGet(
            '/categories',
        );
        return json.categories;
    },

    getAds: async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },
    getAd: async (id, other = false) => {
        const json = await apiFetchGet(
            `/ad/item`,
            {id, other }
        );
        return json;
    },

    addAd: async (formData) => {
        const json = await apiFetchFile(
            '/ad/add',
            formData
        );
        return json;
    }

}

export default () => OlxAPI;
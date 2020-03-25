import axios from 'axios';
import * as utils from './constants/utils'


axios.defaults.headers.common['Authorization'] = `Basic cG9jOlBhY2lmaWtvMTAwJQ==` 

export const getUserInfo = (email, password) => {
    return new Promise(async (resolve, reject) => {
        await axios.get( utils.trackeatUrl + `/pgAPI/password/${password}/email/${email}` , {withCredentials: true})
            .then(({status, data}) => {
                if(status === 200){
                    resolve(data);
                } else {
                    console.log("Error de conexión")
                }
                
            })
            .catch(reject)            
    })  
}

export const createAcount = (email, password, name, image) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(utils.trackeatUrl + `/email/${email}/password/${password}/image/${image}/name/${name}` , {withCredentials: true})
            .then(({status, data}) => {
                if(status === 200){
                    resolve(data);
                } else {
                    console.log("Error de conexión")
                }
                
            })
            .catch(reject)            
    })  
}


import axios from 'axios';
import * as utils from './constants/utils'


axios.defaults.headers.common['Authorization'] = `Basic cG9jOlBhY2lmaWtvMTAwJQ==` 

export const getUserInfo = (email, password) => {
    return new Promise(async (resolve, reject) => {
        await axios.get( utils.trackeatUrl + `pgAPI/password/${password}/email/${email}` , {withCredentials: true})
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

export const getUserOrders = (userId) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(utils.trackeatUrl + `orders/userId/${userId}` , {withCredentials: true})
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

export const getOrdersByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(utils.trackeatUrl + `orders/email/${email}` , {withCredentials: true})
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

export const getProductsName = (productId) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(utils.trackeatUrl + `orders/productId/${productId}` , {withCredentials: true})
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

export const getUserPoints = (userId) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(utils.trackeatUrl + `pgAPI/userId/${userId}` , {withCredentials: true})
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

export const getCanjeables = (puntos) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(utils.trackeatUrl + `pgAPI/puntos/${puntos}` , {withCredentials: true})
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


export const getAllProducts = () => {
    return new Promise(async (resolve, reject) => {
        await axios.get(utils.trackeatUrl + `orders/productos/` , {withCredentials: true})
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



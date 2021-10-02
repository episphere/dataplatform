import { config } from '../config.js'
import { applicationURLs, refreshToken } from '../shared.js';

export const checkAccessTokenValidity = async () => {
    const access_token = JSON.parse(localStorage.parms).access_token;
    try{
        const response = await fetch('https://api.box.com/2.0/users/me',{
           method:'GET',
            headers:{
                Authorization:"Bearer "+access_token
            }
        });
        if(response.status === 401){
            if((await refreshToken()) === true) return await checkAccessTokenValidity();
        } if(response.status === 200){
            return response.json();
        }
        else{
            return null;
        }
    }
    catch(error){
        if((await refreshToken()) === true) return await checkAccessTokenValidity();
    }
}

export const loginObs = () => {
    document.location.href=`https://account.box.com/api/oauth2/authorize?response_type=code&client_id=${config.iniAppStage.client_id}&redirect_uri=${applicationURLs.stage}&state=${config.iniAppStage.stateIni}`
}

export const loginAppDev = () => {
    document.location.href=`https://account.box.com/api/oauth2/authorize?response_type=code&client_id=${config.iniAppLocal.client_id}&redirect_uri=${location.origin+location.pathname}?state=${config.iniAppLocal.stateIni}`
}

export const loginAppProd = () => {
    document.location.href=`https://account.box.com/api/oauth2/authorize?response_type=code&client_id=${config.iniAppDev.client_id}&redirect_uri=${applicationURLs.dev}&state=${config.iniAppDev.stateIni}`
}

export const logOut = () => {
    localStorage.clear();
    location.reload();
}

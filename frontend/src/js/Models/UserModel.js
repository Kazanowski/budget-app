import { async } from 'regenerator-runtime';
import { state } from './state';
import {URL_SERVER} from './../constants';

class UserModel{
    register = async user => {
        try{
            const result = await fetch(`${URL_SERVER}users/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...user})
            });
            const data =  await result.json();
            return {
                status: result.ok,
                ...(data.message && { message: data.message })
            }

        }catch(error){
            console.log(error);
        }
    }

    login = async (email, password) => {
        try{
            const result = await fetch(`${URL_SERVER}users/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email,
                    password: password,
                })     
            });
            console.log(result);
            const data =  await result.json();
            
            if(result.ok){
                state.setLoggedUserID(data.id);
            }
            return {
                status: result.ok,
                ...(data.message && { message: data.message })
            }
        }catch(error){
            console.log(error);
        }
    }

    logout = () => {
        state.clear();
    }
}
export default new UserModel();



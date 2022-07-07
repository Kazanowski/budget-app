import LoginView from "./../Views/Authorization/LoginView";
import RegiesterView from "../Views/Authorization/RegiesterView";
import UserModel from "../Models/UserModel";
import Notification from "./../components/Notification";
import { message } from "../constants";
import { state } from "../Models/state";
import Spinner from "../components/Spinner";


const registerController = async (user) => {
    Spinner.render();
    const result = await UserModel.register(user);
    if(result.status){
      LoginView.render();
      Notification.add({type: "success", title: "Welcome", message: message.createAccountSuccess});
    }else{
      Notification.add({type: "error", title: "Register failed!", message: result.message});
    }
    Spinner.remove();
}
const loginController = async (email, password) => {
    Spinner.render();
    await UserModel.login(email, password);

    if(!state.getLoggedUserID()){
        Notification.add({type: 'error', title: 'Login failed', message: message.loginFail});
        Spinner.remove();
        return;
    }
    window.location.reload();
}
const logoutController = () => {
    UserModel.logout();
    window.location.reload();
}

const renderRegisterViewController = () => RegiesterView.render();
const renderLoginViewController = () => LoginView.render();

export {
    renderRegisterViewController,
    renderLoginViewController,
    registerController,
    loginController,
    logoutController
}
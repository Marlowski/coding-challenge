let userElem = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
import userlist from "../../data/userlist.json"

function isUserCached() {
    return !!userElem;
}

function login(username: String, password: String) {
    const pseudoUser = userlist[0];

    if(username === pseudoUser.username && password === pseudoUser.password) {
        localStorage.setItem('user', JSON.stringify(userlist[0]));
        userElem = JSON.stringify(userlist[0]);
        return true;
    } else {
        return false;
    }
}

function logout() {
    localStorage.removeItem('user');
    userElem = null;
    return;
}

function getUser() {
    return userElem;
}

export const userService = {
    isUserCached,
    login,
    logout,
    getUser,
}
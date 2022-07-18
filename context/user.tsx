import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {userService} from "../services/user/service";


type LayoutProp = {
    children: ReactNode,
}

const userContextDefault: CodingChallengeUserSessionContext = {
    user: null,
    login: () => { return false; },
    logout: () => {},
    isCached: () => { return false; },
}

const UserContext = createContext<CodingChallengeUserSessionContext>(userContextDefault);

function useUser() {
    return useContext(UserContext);
}

function UserProvider({ children }: LayoutProp) {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
       if(user === null && userService.isUserCached()) {
           setUser(userService.getUser());
       }
    }, [user]);

    const login = (username: string, password: string) => {
        if(userService.login(username, password)) {
            setUser(userService.getUser());
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        userService.logout();
        setUser(null);
    };

    //if trying to check cached state via user it will initialy return null,
    //since both hooks appear to fire at the same time so the user elem isnt overwritten in time
    const isCached = () => {
        return userService.isUserCached();
    }

    const value = {
        user,
        login,
        logout,
        isCached,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}

export {
    useUser,
    UserProvider
}
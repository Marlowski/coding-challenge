type CodingChallengeUserSessionContext = {
    user: string | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    isCached: () => boolean;
}

type CodingChallengeUserLoginData = {
    username: string;
    password: string;
}
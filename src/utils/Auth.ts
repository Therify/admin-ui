type UserSession = {
    [x: string]: string;
};
enum UserPermissions {}

const authHandler = () => {
    let _isAuthenticated = true;

    const isAuthenticated = () => _isAuthenticated;
    const hasUserPermission = ({}: { user: UserSession; targetPermission: UserPermissions }) => {
        // check user session for user permission
        return true;
    };
    const login = (cb?: () => void) => {
        _isAuthenticated = true;
        if (cb) cb();
    };
    const logout = (cb?: () => void) => {
        _isAuthenticated = false;
        if (cb) cb();
    };
    return {
        isAuthenticated,
        hasUserPermission,
        login,
        logout,
    };
};
export default authHandler();

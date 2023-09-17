import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {
  useCurrentUserQuery,
  useLoginUserMutation,
  useLogoutMutation,
  //   useRefreshJWTMutation,
  //   useRegisterUserMutation,
  //   useLazyCurrentUserQuery,
} from "../redux/service/user/user.api";

// eslint-disable-next-line import/prefer-default-export
export const useAuth = () => {
  const jwtToken = Cookies.get("jwt_acess_token");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useCurrentUserQuery(undefined, {
      skip: jwtToken,
    });
  const [login] = useLoginUserMutation();
  const [logout] = useLogoutMutation();
  const [isAuthenticated, setIsAuthenticated] = useState(jwtToken);
  const [userRole, setUserRole] = useState(currentUser?.role || null);

  useEffect(() => {
    if (!isCurrentUserLoading) {
      setUserRole(currentUser?.role || null);

      if (jwtToken) {
        setIsAuthenticated(true);
        if (currentUser && currentUser.role) {
        }
      }
    }
  }, [currentUser, isCurrentUserLoading, jwtToken]);

  const handleLogin = async (userData) => {
    const { jwtToken, role, username } = await login(userData).unwrap();
    Cookies.set("jwt_acess_token", jwtToken);

    if (role && role === "hui") {
      navigate("/");
    } else if (role) {
      navigate(`${username}/profile`);
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout([]).then((result) => {
      const err = JSON.parse(JSON.stringify(result));
      if (!err.error && !isAuthenticated && !isCurrentUserLoading) {
        Cookies.remove("jwt_access_token");
        Cookies.remove("jwt_refresh_token");
        setIsAuthenticated(jwtToken);
        setUserRole(null);
        navigate("/");
      }
    });
  };

  return {
    isAuthenticated,
    userRole,
    isCurrentUserLoading,
    login: handleLogin,
    logout: handleLogout,
    currentUser,
  };
};

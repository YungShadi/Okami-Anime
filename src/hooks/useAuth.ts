import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
  useCurrentUserQuery,
  useLoginUserMutation,
  useLogoutMutation,
  //   useRefreshJWTMutation,
  //   useRegisterUserMutation,
  //   useLazyCurrentUserQuery,
} from "../redux/service/user/user.api";
import { currentUserAction } from "../redux/aunthSlice";

// eslint-disable-next-line import/prefer-default-export
export const useAuth = () => {
  const dispatch = useDispatch();
  const jwtToken = !!Cookies.get("access_jwt_token");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useCurrentUserQuery(undefined, {
      skip: !jwtToken,
    });
  const [login] = useLoginUserMutation();
  const [logout] = useLogoutMutation();
  const [isAuthenticated, setIsAuthenticated] = useState(jwtToken);
  const [userRole, setUserRole] = useState(currentUser?.role || null);

  // useEffect(() => {
  //   if (!isCurrentUserLoading) {
  //     setUserRole(currentUser?.role || null);

  //     if (jwtToken) {
  //       setIsAuthenticated(true);
  //       if (currentUser && currentUser.role) {
  //       }
  //     }
  //   }
  // }, [currentUser, isCurrentUserLoading, jwtToken]);
  useEffect(() => {
    if (!isCurrentUserLoading && currentUser) {
      dispatch(currentUserAction(currentUser));
      setIsAuthenticated(true);
    }
  }, [currentUser, isCurrentUserLoading]);

  const handleLogin = async (userData) => {
    // eslint-disable-next-line camelcase
    const { authorities, username, access_jwt_token, refresh_jwt_token } =
      await login(userData).unwrap();
    Cookies.set("access_jwt_token", access_jwt_token, {
      expires: 31,
      secure: true,
    });
    Cookies.set("refresh_jwt_token", refresh_jwt_token);

    if (authorities && authorities === "UNDEFINED") {
      navigate("/");
    } else if (authorities) {
      navigate(`${username}/profile`);
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout(undefined).then((result) => {
      const err = JSON.parse(JSON.stringify(result));
      if (!err.error && !isAuthenticated && !isCurrentUserLoading) {
        Cookies.remove("access_jwt_token");
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

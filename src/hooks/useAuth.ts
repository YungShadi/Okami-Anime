import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  useCurrentUserQuery,
  useLoginUserMutation,
  useLogoutMutation,
  useRegisterUserMutation,
  //   useRefreshJWTMutation,
} from "../redux/service/user/user.api";
import { currentUserAction, logoutAction } from "../redux/aunthSlice";
import { UserDto } from "../types/userDto";

import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line import/prefer-default-export
export const useAuth = () => {
  const dispatch = useDispatch();
  const jwtToken = !!Cookies.get("access_jwt_token");
  const navigate = useNavigate();

  // const { pathname } = useLocation();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useCurrentUserQuery(undefined, {
      skip: !jwtToken,
    });
  const [login] = useLoginUserMutation();
  const [logout] = useLogoutMutation();
  const [regestration] = useRegisterUserMutation();
  const [isAuthenticated, setIsAuthenticated] = useState(jwtToken);
  // const [userRole, setUserRole] = useState(currentUser?.role || null);

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
      setIsAuthenticated(true);
      dispatch(currentUserAction(currentUser));
    } else {
      setIsAuthenticated(jwtToken);
      dispatch(logoutAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, isCurrentUserLoading, jwtToken]);

  const handleReg = async (userData: UserDto) => {
    try {
      // eslint-disable-next-line camelcase
      const { access_jwt_token, refresh_jwt_token } =
        await regestration(userData).unwrap();
      Cookies.set("access_jwt_token", access_jwt_token, {
        expires: 31,
        secure: true,
      });
      Cookies.set("refresh_jwt_token", refresh_jwt_token);
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleLogin = async (userData: UserDto) => {
    try {
      // eslint-disable-next-line camelcase
      const { authorities, username, access_jwt_token, refresh_jwt_token } =
        await login(userData).unwrap();

      Cookies.set("access_jwt_token", access_jwt_token, {
        expires: 31,
        secure: true,
      });
      Cookies.set("refresh_jwt_token", refresh_jwt_token);
      setIsAuthenticated(true);

      if (authorities && authorities === "UNDEFINED") {
        navigate("/");
      } else if (authorities.inclides("ROLE_USER")) {
        navigate(`${username}/profile`);
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.error);
      throw new Error(error);
    }
  };

  const handleLogout = () => {
    logout([])
      .then(() => {
        Cookies.remove("access_jwt_token");
        Cookies.remove("refresh_jwt_token");
        setIsAuthenticated(false);
        // setUserRole(null);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.error);
        throw new Error(error);
      });
  };

  return {
    isAuthenticated,
    // userRole,
    isCurrentUserLoading,
    login: handleLogin,
    logout: handleLogout,
    regestration: handleReg,
    currentUser,
  };
};

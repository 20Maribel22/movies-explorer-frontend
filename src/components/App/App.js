import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import { mainApi } from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [statusRegister, setStatusRegister] = useState(false);
  const [statusLogin, setStatusLogin] = useState(false);
  const [statusUser, setStatusUser] = useState(false);

  let navigate = useNavigate();

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    mainApi.setToken(jwt);
    if (jwt) {
      mainApi
        .getUserInfo()
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
          } else {
            handleLogout();
          }
        })
        .catch((err) => {
          console.log(err);
          handleLogout();
        });
    } else {
      handleLogout();
    }
  };

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const handleRegister = (name, email, password) => {
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          navigate("/signin");
        }
      })
      .catch((err) => {
        setStatusRegister(err);
      });
  };

  const handleLogin = (email, password) => {
    mainApi
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((err) => {
        setStatusLogin(err);
      });
  };

  const handleUpdateUser = (name, email) => {
    mainApi
      .setUserInfo(name, email)
      .then((user) => {
        setCurrentUser(user);
        setStatusUser(200);
      })
      .catch((err) => {
        setStatusUser(err);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    navigate("/");
    setLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies loggedIn={loggedIn} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies loggedIn={loggedIn} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                  loggedIn={loggedIn}
                  onUpdateUser={handleUpdateUser}
                  handleLogout={handleLogout}
                  statusUser={statusUser}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <Login handleLogin={handleLogin} statusLogin={statusLogin} />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                handleRegister={handleRegister}
                statusRegister={statusRegister}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SignUp } from "signup";

import { history, fetchWrapper } from "_helpers";

// create slice

const name = "auth";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    error: null,
  };
}

function createReducers() {
  return {
    logout,
  };

  function logout(state) {
    state.user = null;
    localStorage.removeItem("user");
    history.navigate("/login");
  }
}

function createExtraActions() {
  console.log("extra sss");
  //   const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
  const baseUrl = `https://interview-api.onrender.com/v1`;

  return {
    login: login(),
    signup: SignUp(),
    createCard: createCard(),
  };

  //   function login() {
  //     // console.log("inside");
  //     return createAsyncThunk(
  //       `${name}/login`,
  //       console.log(baseUrl),
  //       async ({ email, password }) =>
  //         await axios.post(
  //           "https://interview-api-onrender.com/v1/auth/register/auth/login",
  //           {
  //             email,
  //             password,
  //           }
  //         )
  //     );
  //   }
  function login() {
    console.log(baseUrl);

    return createAsyncThunk(
      `${name}/login`,
      async ({ email, password }) =>
        await axios
          .post(`${baseUrl}/auth/login`, {
            email,
            password,
          })
          .then(
            // console.log(res.data.tokens.access.token)
            (res) =>
              localStorage.setItem(
                "user",
                JSON.stringify(res.data.tokens.access.token)
              )
          )

          .catch((error) => console.log(error))
    );
  }
  function SignUp() {
    return createAsyncThunk(
      `${name}/SignUp`,
      async ({ name, email, password }) =>
        await axios
          .post("https://interview-api.onrender.com/v1/auth/register", {
            name,
            email,
            password,
          })
          .then((res) => console.log(res))
          .catch((error) => console.log(error))
    );
  }
  function createCard() {
    return createAsyncThunk(
      `${name}/createCard`,
      async ({ cardData }) =>
        await axios
          .post("https://interview-api.onrender.com/v1/cards", {
            cardData,
          })
          .then((res) => localStorage.setItem("card", JSON.stringify(res.data)))
          .catch((error) => console.log(error))
    );
  }
}

function createExtraReducers() {
  return {
    ...login(),
    ...SignUp(),
    ...createCard(),
  };

  function login() {
    var { pending, fulfilled, rejected } = extraActions.login;
    return {
      [pending]: (state) => {
        console.log("error", state.error);
        state.error = null;
      },
      [fulfilled]: (state, action) => {
        console.log(action);
        const user = localStorage.getItem("user");
        console.log(user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem("user", JSON.stringify(user));
        state.user = user;

        // get return url from location state or default to home page
        const { from } = history.location.state || { from: { pathname: "/" } };
        history.navigate("/");
      },
      [rejected]: (state, action) => {
        state.error = action.error;
      },
    };
  }
  function SignUp() {
    var { pending, fulfilled, rejected } = extraActions.signup;
    return {
      [pending]: (state) => {
        state.error = null;
      },
      [fulfilled]: (state, action) => {
        const user = action.payload;

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem("user", JSON.stringify(user));
        state.user = user;

        // get return url from location state or default to home page
        console.log("here");

        const { from } = history.location.state || {
          from: { pathname: "/" },
        };
        history.navigate("/login");
        console.log("here");
        // history.navigate(from);
      },
      [rejected]: (state, action) => {
        state.error = action.error;
      },
    };
  }
  function createCard() {
    var { pending, fulfilled, rejected } = extraActions.createCard;
    return {
      [pending]: (state) => {
        state.error = null;
      },
      [fulfilled]: (state, action) => {
        // const user = action.payload;

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem("user", JSON.stringify(user));
        // state.user = user;

        // get return url from location state or default to home page
        console.log("here");

        const { from } = history.location.state || {
          from: { pathname: "/cards" },
        };
        console.log("here");
        // history.navigate(from);
      },
      [rejected]: (state, action) => {
        state.error = action.error;
      },
    };
  }
}

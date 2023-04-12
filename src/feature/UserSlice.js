import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
  // user detail object
  userDetail: [
    // token: '',
    // status: '',
    // documentId: '',
    // title: '',
    // name: '',
    // phoneNo: '',
    // author: '',
    // msg: '',
    // messageRcvd: ''
  ],
  loggedIn: false,
  isFetching: false,
  isSuccess: false,
  isError: false
};

export const signupUser = createAsyncThunk(
  '/register',
  async ({ loggedIn, token, status, documentId, title, name, phoneNo, author, msg }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          loggedIn,
          token,
          status,
          documentId,
          title,
          name,
          phoneNo,
          author,
          msg
        })
      });
      let data = await response.json();
      console.log('data', data);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk('/login', async (thunkAPI) => {
  try {
    console.log('rana loop coming here... ');
    const response = await fetch('http://localhost:3000/login', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    console.log('response', data);
    if (response.status === 200) {
      localStorage.setItem('token', data.token);
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e) {
    console.log('Error', e.response.data);
    thunkAPI.rejectWithValue(e.response.data);
  }
});

export const fetchUserBytoken = createAsyncThunk(
  'users/fetchUserByToken',
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch('https://mock-user-auth-server.herokuapp.com/api/v1/users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });
      let data = await response.json();
      console.log('data', data, response.status);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    }
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      console.log('rana payload in redux coming is.. ', payload);
      state.userDetail = payload.userDetails;
      console.log('rana.... ', state.userDetail);
      state.isFetching = false;
      state.isSuccess = true;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.userDetail = payload;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log('rana.... ', payload);
      state.userDetail = payload;
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.email = payload.email;
      state.username = payload.name;
    },
    [fetchUserBytoken.rejected]: (state) => {
      console.log('fetchUserBytoken');
      state.isFetching = false;
      state.isError = true;
    }
  }
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;

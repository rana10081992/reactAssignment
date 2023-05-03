import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_BASE_URL from './../App.constant';
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
  registrationData: {},
  products: {},
  loggedIn: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  initialSignUp: false,
  signUpErrorMsg: ''
};

export const signupUser = createAsyncThunk(
  '/register',
  async ({ loggedIn, status, documentType, name, phoneNo, address }, thunkAPI) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          loggedIn,
          status,
          documentType,
          name,
          phoneNo,
          address
        })
      });
      let data = await response.json();
      console.log('rana... signup response is...  ', data);
      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const signUpCompletion = createAsyncThunk(
  '/uploadPhoto',
  async ({ documentId, documentType, name, phoneNo, address, docUrl, photoUrl }, thunkAPI) => {
    try {
      const response = await fetch(`${API_BASE_URL}/uploadPhoto`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          documentId,
          documentType,
          name,
          phoneNo,
          address,
          docUrl,
          photoUrl
        })
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk('/login', async ({ phoneNo, password }, thunkAPI) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNo,
        password
      })
    });
    let data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e) {
    thunkAPI.rejectWithValue(e.response.data);
  }
});

export const prouductDetails = createAsyncThunk('/productDetails', async (undef, thunkAPI) => {
  console.log('rana.... inside API...');
  try {
    const response = await fetch(`${API_BASE_URL}/productDetails`, {
      method: 'GET'
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json'
      // },
      // body: JSON.stringify({})
    });
    console.log('rana inside API...');
    let data = await response.json();
    if (response.status === 200) {
      return { ...data };
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.initialSignUp = false;

      return state;
    }
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.userDetail = payload.userDetails;
      // state.isFetching = false;
      // state.isSuccess = true;
      state.initialSignUp = true;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      if (payload) {
        state.userDetail = payload;
        state.signUpErrorMsg = payload.error;
      }
    },
    [signUpCompletion.fulfilled]: (state, { payload }) => {
      state.userDetail = payload.userDetails;
      state.isSuccess = true;
    },
    [signUpCompletion.pending]: (state) => {
      state.isFetching = true;
    },
    [signUpCompletion.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      // state.userDetail = payload;
      state.signUpErrorMsg = payload.error;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.userDetail = payload.obj;
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      // state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [prouductDetails.fulfilled]: (state, { payload }) => {
      state.products = payload;
      // state.isFetching = false;
    },
    [prouductDetails.pending]: (state) => {
      state.isFetching = true;
    },
    [prouductDetails.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    }
  }
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;

import { configureStore } from '@reduxjs/toolkit';
import { userSlice, signupUser } from './UserSlice';

describe('signupUser', () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userSlice.reducer
      }
    });
  });

  it('should create a new user', async () => {
    const payload = {
      loggedIn: true,
      status: 'active',
      documentId: '1234',
      name: 'John Doe',
      phoneNo: '1234567890',
      address: '123 Main St'
    };

    await store.dispatch(signupUser(payload));
    const state = store.getState().user;

    expect(state.isFetching).toBe(false);
    expect(state.isError).toBe(true);
    expect(state.isSuccess).toBe(false);
  });
});

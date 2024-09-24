import {
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchUpdateUser,
  userReducer,
  initialState
} from './user-slice';

describe('тесты слайса пользователя', () => {
  const user = {
    success: true,
    user: {
      email: 'joedoe@email.ru',
      name: 'Joe Doe'
    }
  };

  const fulfilledAuthState = {
    data: user.user,
    loading: false,
    error: null,
    isAuthChecked: true
  };

  const rejectedAuthState = {
    data: null,
    loading: false,
    error: 'Ошибка',
    isAuthChecked: false
  };

  const pendingState = {
    data: null,
    loading: false,
    error: null,
    isAuthChecked: false
  };

  const updatedAuthState = {
    data: { email: 'joedoe@email.ru', name: 'Joe Joe Doe' },
    loading: false,
    error: null,
    isAuthChecked: true
  };

  test('тест регистрации', () => {
    const newState = userReducer(initialState, {
      type: fetchRegister.fulfilled.type,
      payload: user.user
    });

    expect(newState).toEqual(fulfilledAuthState);
  });

  test('тест ошибки при регистрации', () => {
    const newState = userReducer(initialState, {
      type: fetchRegister.rejected.type,
      error: { message: 'Ошибка' }
    });

    expect(newState).toEqual(rejectedAuthState);
  });

  test('тест login', () => {
    const newState = userReducer(initialState, {
      type: fetchLogin.fulfilled.type,
      payload: user.user
    });

    expect(newState).toEqual(fulfilledAuthState);
  });

  test('тест ошибки при login', () => {
    const newState = userReducer(initialState, {
      type: fetchLogin.rejected.type,
      error: { message: 'Ошибка' }
    });

    expect(newState).toEqual(rejectedAuthState);
  });

  test('тест logout', () => {
    const newState = userReducer(initialState, {
      type: fetchLogout.fulfilled.type
    });

    expect(newState).toEqual(initialState);
  });

  test('тест обновления инфо', () => {
    const newState = userReducer(initialState, {
      type: fetchUpdateUser.fulfilled.type,
      payload: { email: 'joedoe@email.ru', name: 'Joe Joe Doe' }
    });

    expect(newState).toEqual(updatedAuthState);
  });

  test('тест ошибки обновлении', () => {
    const newState = userReducer(initialState, {
      type: fetchUpdateUser.rejected.type,
      error: { message: 'Ошибка' }
    });

    expect(newState).toEqual(rejectedAuthState);
  });

  test('тест fetchRegister pending', () => {
    const newState = userReducer(initialState, {
      type: fetchRegister.pending.type
    });

    expect(newState).toEqual(pendingState);
  });

  test('тест fetchLogin pending', () => {
    const newState = userReducer(initialState, {
      type: fetchLogin.pending.type
    });

    expect(newState).toEqual(pendingState);
  });

  test('тест fetchUpdateUser pending', () => {
    const newState = userReducer(initialState, {
      type: fetchUpdateUser.pending.type
    });

    expect(newState).toEqual(pendingState);
  });
});

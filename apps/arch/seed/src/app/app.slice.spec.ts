import {
  appReducer,
  getAppStart,
  getAppFailure,
  getAppSuccess
} from './app.slice';

describe('app reducer', () => {
  it('should handle initial state', () => {
    expect(appReducer(undefined, { type: '' })).toMatchObject({
      entities: []
    });
  });

  it('should handle get app actions', () => {
    let state = appReducer(undefined, getAppStart());

    expect(state).toEqual({
      loaded: false,
      error: null,
      entities: []
    });

    state = appReducer(state, getAppSuccess([{ id: 1 }]));

    expect(state).toEqual({
      loaded: true,
      error: null,
      entities: [{ id: 1 }]
    });

    state = appReducer(state, getAppFailure('Uh oh'));

    expect(state).toEqual({
      loaded: true,
      error: 'Uh oh',
      entities: [{ id: 1 }]
    });
  });
});

import {
  createSlice,
  createSelector,
  Action,
  PayloadAction
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

export const APP_FEATURE_KEY = 'app';

/*
 * Change this from `any` if there is a more specific error type.
 */
export type AppError = any;

/*
 * Update these interfaces according to your requirements.
 */
export interface AppEntity {
  id: number;
}

export interface AppState {
  entities: AppEntity[];
  loaded: boolean;
  error: AppError;
}

export const initialAppState: AppState = {
  entities: [],
  loaded: false,
  error: null
};

export const appSlice = createSlice({
  name: APP_FEATURE_KEY,
  initialState: initialAppState as AppState,
  reducers: {
    getAppStart: (state, action: PayloadAction<undefined>) => {
      state.loaded = false;
    },
    getAppSuccess: (state, action: PayloadAction<AppEntity[]>) => {
      state.loaded = true;
      state.entities = action.payload;
    },
    getAppFailure: (state, action: PayloadAction<AppError>) => {
      state.error = action.payload;
    }
  }
});

/*
 * Export reducer for store configuration.
 */
export const appReducer = appSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * const dispatch = useDispatch();
 * dispatch(getAppSuccess([{ id: 1 }]));
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const { getAppStart, getAppSuccess, getAppFailure } = appSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * const entities = useSelector(selectAppEntities);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
export const getAppState = (rootState: any): AppState =>
  rootState[APP_FEATURE_KEY];

export const selectAppEntities = createSelector(
  getAppState,
  s => s.entities
);

export const selectAppLoaded = createSelector(
  getAppState,
  s => s.loaded
);

export const selectAppError = createSelector(
  getAppState,
  s => s.error
);

/*
 * Export default effect, handled by redux-thunk.
 * You can replace this with your own effects solution.
 */
export const fetchApp = (): ThunkAction<
  void,
  any,
  null,
  Action<string>
> => async dispatch => {
  try {
    dispatch(getAppStart());
    // Replace this with your custom fetch call.
    // For example, `const data = await myApi.getApp`;
    // Right now we just load an empty array.
    const data = [];
    dispatch(getAppSuccess(data));
  } catch (err) {
    dispatch(getAppFailure(err));
  }
};

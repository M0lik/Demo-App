import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createMigrate from "redux-persist/lib/createMigrate";

const STORE_VERSION = 1;

const migrations = {
  [STORE_VERSION]: (state) => {
    state = { ...state };
  },
};

const persistConfig = {
  key: "root",
  version: STORE_VERSION,
  storage,
  migrate: createMigrate(migrations, { debug: true }),
};

const reducers = combineReducers({
  userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: persistedReducer,
    middleware: [
      ...getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      ...middlewares,
    ],
    devTools: false,
  });

  sagaMiddleware.run(sagas);

  return store;
};

export default store;

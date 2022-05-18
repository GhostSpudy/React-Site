import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import AdminReducer from "./AdminReducer";
import BlogReducer from "./BlogReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
  admin: AdminReducer,
  user: UserReducer,
  blogs: BlogReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
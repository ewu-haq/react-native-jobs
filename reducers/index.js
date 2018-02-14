import { combineReducers } from "redux";
import auth from "./auth_reducer";
import jobs from "./job_reducer";
import likeJobs from "./likes_reducer";

export default combineReducers({
  auth,
  jobs,
  likeJobs
});

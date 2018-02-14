import { LIKE_JOBS } from "../actions/type";
import _ from "lodash";

export default function(state = [], action) {
  switch (action.type) {
    case LIKE_JOBS:
      return _.uniqBy([action.payload, ...state], "jobkey");
    default:
      return state;
  }
}

import axios from "axios";
import reverseGeocode from "latlng-to-zip";
import { FETCH_JOBS, LIKE_JOBS } from "./type";
import qs from "qs";

const JOB_ROOT_URL = "http://api.indeed.com/ads/apisearch?";
const JOB_QUERY_PARAMS = {
  publisher: "4201738803816157",
  format: "json",
  v: "2",
  latlong: 1,
  radius: 10,
  q: "javascript" // hardcode type of jobs
};

const buildJobsUrl = zip => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => {
  return async dispatch => {
    try {
      let zip = await reverseGeocode(region);
      const url = buildJobsUrl(zip);
      let { data } = await axios.get(url);
      dispatch({ type: FETCH_JOBS, payload: data });
      callback();
    } catch (e) {
      console.log(e);
    }
  };
};

export const likeJob = job => {
  return {
    payload: job,
    type: LIKE_JOBS
  };
};

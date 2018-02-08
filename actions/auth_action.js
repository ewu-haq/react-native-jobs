import { AsyncStorage } from "react-native";
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from "./type";
// AsyncStorage.setItem('fb_token', token)
// AsyncStorage.getItem('fb_token')

export const facebookLogin = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem("fb_token");
    if (token) {
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
      doFacebookLogin(dispatch);
    }
  };
};

const doFacebookLogin = async dispatch => {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    "219932081910471",
    {
      permissions: ["public_profile"]
    }
  );
  if (type === "success") {
    await AsyncStorage.setItem("fb_token", token);
    return dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else if (type === "cancel") {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
};

const GENERAL_PATH: Record<string, string> = {
  AUTH: "/auth",
  PROJECTS: "/projects",
};

export const PATH: Record<string, string> = {
  HOME: "/",
  ALL: "*",
  SIGN_IN: `${GENERAL_PATH.AUTH}/signIn`,
  SIGN_UP: `${GENERAL_PATH.AUTH}/signUp`,
};

export const API_ENDPOINTS: Record<string, string> = {
  SIGNOUT: `${GENERAL_PATH.AUTH}/signOut`,
  SIGNIN: `${GENERAL_PATH.AUTH}/signIn`,
  SIGNUP: `${GENERAL_PATH.AUTH}/signUp`,
  PROJECTS: GENERAL_PATH.PROJECTS,
};

export const MIN_PASSWORD_UNIT = 8;
export const MAX_PASSWORD_UNIT = 40;

export const SCROLL_THRESHOLD = 60;

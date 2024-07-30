// @flow
export type UserLoginData = {
  username: string,
  password: string,
  group: string,
};

export type ILoginProps = {
  classes: {
    [props: string]: any,
  },
  handleChange: (e: Event) => void,
  history: any,
  values: UserLoginData,
  isAuth: boolean,
  isFetching: boolean,
  groups: any
};

export type PropsAuthAction = {
  props: {
    ACTION_USER_AUTH_REQUESTED: ({
      username: string,
      password: string,
      group: string,
    }) => void,
  },
};

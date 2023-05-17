import createInstance from '../createCustomInstance';

const API = createInstance();

export const loginUser = (userLoginData) =>
  API.post('/auth/login', userLoginData)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });

export default {
  loginUser,
};

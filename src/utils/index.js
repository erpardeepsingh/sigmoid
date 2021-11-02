const isLogin = () => {
  return localStorage.getItem("token") ? true : false;
};

export { isLogin };

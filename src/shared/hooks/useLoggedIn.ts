const useLoggedIn = () => {
  let isLoggedIn: boolean;

  const details = localStorage.getItem("login");

  isLoggedIn = !!details;
  console.log(isLoggedIn);

  return { isLoggedIn };
};

export default useLoggedIn;

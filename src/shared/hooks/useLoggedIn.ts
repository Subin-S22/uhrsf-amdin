import { useEffect, useState } from "react";

const useLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const details = localStorage.getItem("login");
    console.log(details);

    setIsLoggedIn(!!details);
  }, [isLoggedIn]);
  return { isLoggedIn };
};

export default useLoggedIn;

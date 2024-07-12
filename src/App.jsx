import { lazy, Suspense, useEffect, useState } from "react";

import "./App.css";
import { APP_CONSTANTS } from "./constants/app";
import { GlobalStateContext } from "./GlobalStateContext/GlobalState";
import { jwtDecode } from "jwt-decode";

const UnAuthenticatedRoutes = lazy(() =>
  import("./components/UnAuthenticatedRoutes")
);
const AuthenticatedRoutes = lazy(() =>
  import("./components/AuthenticatedRoutes")
);

function App() {
  const [authorized, setAuthorized] = useState(false);
  const [state, setState] = useState({});
  // let token = localStorage.getItem(APP_CONSTANTS.token);

  useEffect(() => {
    const deleteTokenAndKickUserOut = () => {
      sessionStorage.removeItem(APP_CONSTANTS.token);
    };

    const token = sessionStorage?.getItem(APP_CONSTANTS.token);

    if (token) {
      const decoded = jwtDecode(token);
      const expiryDate = new Date(decoded?.exp * 1000);

      console.log(decoded, "decoded");
      setState(decoded);
      return new Date() > expiryDate
        ? deleteTokenAndKickUserOut()
        : setAuthorized(true);
    }
    return deleteTokenAndKickUserOut();
  }, []);

  return (
    <Suspense fallback={<p></p>}>
      {authorized ? (
        <GlobalStateContext.Provider value={{ state, setState }}>
          <AuthenticatedRoutes />{" "}
        </GlobalStateContext.Provider>
      ) : (
        <UnAuthenticatedRoutes />
      )}
    </Suspense>
  );
}

export default App;

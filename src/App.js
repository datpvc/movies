import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import ScrollToTop from "./HOC/SrollToTop";
import { routes } from "./Routes/routes";

function App() {
  return (
    <div className="App">
      <Spinner />
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  key={route.key}
                  path={route.path}
                  element={route.component}
                />
              );
            })}
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;

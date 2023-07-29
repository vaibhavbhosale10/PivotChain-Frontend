import logo from "./logo.svg";
import "./App.css";
import FetchProduct from "./products/fetchProduct";

import "bootstrap/dist/css/bootstrap.min.css";
import UpdateProduct from "./update/update";

function App() {
  return (
    <div className="App">
      {/* <FetchProduct /> */}
      <UpdateProduct />
    </div>
  );
}

export default App;

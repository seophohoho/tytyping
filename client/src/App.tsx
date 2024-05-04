import "./App.css";
import NavBar from "./component/Navbar";

function App() {
  let items = ["Home", "Product", "Service"];
  return (
    <div className="App">
      <div>
        <NavBar></NavBar>
      </div>
    </div>
  );
}

export default App;

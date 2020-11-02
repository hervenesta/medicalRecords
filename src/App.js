import { BrowserRouter as Router, Route } from "react-router-dom";
import "./css/select.css";
import "./css/style.css";
import Records from "./Records";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" component={Records} />
      </Router>
    </div>
  );
}

export default App;

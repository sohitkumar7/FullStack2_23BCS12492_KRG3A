import Header from "./components/header";
import Logs from "./pages/logs";
import Dashboard from "./pages/dashboard";
import { logs } from "./data/logs";

const App = () => {
  return (
    <div>
      <Header title="EcoTrack - Carbon Footprint Tracker Experiment 1" />
      <Dashboard />
      <Logs logs={logs} />
    </div>
  );
};

export default App;

import React from "react";
import Timeline from "./components/Timeline";
import sessionData from "./data/session.json";

function App() {
  return (
    <div style={{ background: "#111", padding: "20px", minHeight: "100vh" }}>
      <Timeline meetingData={sessionData} />
    </div>

  );
}

export default App;

import { useEffect } from "react";
import "./App.css";
import { render } from "./editor";

const EDITOR_WIDTH = 1000;
const EDITOR_HEIGHT = 900;

function App() {
  useEffect(() => {
    render();
  }, []);

  return (
    <div>
      <svg
        viewBox={`0 0 ${EDITOR_WIDTH} ${EDITOR_HEIGHT}`}
        width={EDITOR_WIDTH}
        height={EDITOR_HEIGHT}
        className="editor"
      ></svg>
    </div>
  );
}

export default App;

import { useEffect } from "react";
import "./App.css";
import { render } from "./editor";
import { Node } from "./Node";

import { EDITOR_WIDTH, EDITOR_HEIGHT } from "./constants";

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
      >
        <foreignObject width="400" height="300">
          <Node />
        </foreignObject>
      </svg>
    </div>
  );
}

export default App;

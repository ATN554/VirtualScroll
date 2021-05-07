import ReactDOM from "react-dom";

import Scroller from "./scroller";

const getChild = (i) => {
  return (
    <div
      key={i}
      style={{
        height: "42px",
        border: "1px solid red"
      }}
    >
      {i}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Scroller
    viewHeight={400}
    itemsCount={31}
    itemHeight={44}
    getAt={getChild}
  />,
  rootElement
);

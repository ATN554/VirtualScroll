import ReactDOM from "react-dom";

import Scroller from "./scroller";

const getChild = (i) => {
  return (
    <div key={i} style={{ height: "40px", border: "1px solid red" }}>
      {i}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Scroller itemsCount={2000} itemHeight={22} getAt={getChild} />,
  rootElement
);

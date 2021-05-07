import React from "react";
import "./styles.css";

export default function Scroller(props) {
  const itemsCount = props.itemsCount;
  const itemHeight = props.itemHeight;
  const getAt = props.getAt;
  const pageSize = 10;
  const bottomQuarter = React.useMemo(() => itemHeight * (pageSize * 0.33), [
    itemHeight,
    pageSize
  ]);
  const topQuarter = React.useMemo(() => itemHeight * (pageSize * 0.67), [
    itemHeight,
    pageSize
  ]);
  const [delta, setDelta] = React.useState(0);

  function handleScroll({ target: { scrollTop } }) {
    console.log(scrollTop, bottomQuarter, topQuarter, delta, itemsCount);
    if (scrollTop > topQuarter) {
      if (delta + 1 < itemsCount - pageSize) {
        setDelta(delta + 1);
      }
    } else if (scrollTop < bottomQuarter) {
      if (delta > 0) {
        setDelta(delta - 1);
      }
    }
  }

  function renderChildren() {
    let children = [];
    for (let i = delta; i < delta + pageSize; i++) {
      let child = getAt(i);
      children.push(child);
    }
    return children;
  }

  return (
    <div style={{ height: "200px", overflow: "auto" }} onScroll={handleScroll}>
      {renderChildren()}
    </div>
  );
}

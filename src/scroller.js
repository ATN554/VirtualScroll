import React from "react";
import "./styles.css";

export default function Scroller(props) {
  const viewHeight = props.viewHeight;
  const itemsCount = props.itemsCount;
  const itemHeight = props.itemHeight;
  const getAt = props.getAt;
  const pageSize = React.useMemo(
    () => Math.floor(viewHeight / itemHeight),
    [viewHeight, itemHeight]
  );
  const renderCountDelta = 6; // invisible items count: half before top and half after bottom
  const renderCount = React.useMemo(() => pageSize + renderCountDelta, [pageSize]);
  const bottomQuarter = React.useMemo(
    () => itemHeight * renderCountDelta * 0.25,
    [itemHeight]
  );
  const topQuarter = React.useMemo(
    () => itemHeight * renderCountDelta * 0.75,
    [itemHeight]
  );
  const [delta, setDelta] = React.useState(0);

  const handleScroll = React.useCallback(
    ({ target: { scrollTop: deltaTopPX } }) => {
      if (deltaTopPX > topQuarter) {
        if (delta < itemsCount - renderCount) {
          let _delta = delta + renderCountDelta / 2;
          setDelta(Math.min(_delta, itemsCount - renderCount));
        }
      } else if (deltaTopPX === 0) {
        setDelta(0);
      } else if (deltaTopPX < bottomQuarter) {
        if (delta > 0) {
          let _delta = delta - renderCountDelta / 2;
          setDelta(Math.max(_delta, 0));
        }
      }
    },
    [topQuarter, bottomQuarter, delta, itemsCount, renderCount]
  );

  const renderChildren = React.useCallback(
    () => {
      let children = [];
      console.log(delta, delta + renderCount);
      for (let i = delta; i < delta + renderCount; i++) {
        children.push(getAt(i));
      }
      return children;
    },
    [delta, renderCount, getAt]
  );

  return (
    <div
      style={{
        height: `${viewHeight}px`,
        overflow: "auto"
      }}
      onScroll={handleScroll}
    >
      {renderChildren()}
    </div>
  );
}

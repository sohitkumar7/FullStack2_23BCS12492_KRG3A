import React from "react";

interface Props {
  count: number;
  goal: number;
}

function CounterDisplay({ count, goal }: Props) {
  console.log("CounterDisplay rendered");

  return (
    <div className="text-center">
      <div className="text-5xl font-bold">{count}</div>
      <div>{count} / {goal} glasses completed</div>
    </div>
  );
}

export default React.memo(CounterDisplay);
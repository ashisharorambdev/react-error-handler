import React, { useState } from "react";

export const ComponentWithSyntaxError = () => {
  const [nonExistentProperty, setNonExistentProperty] = useState(null);
  return (
    <div>
      <p>This component has a syntax error</p>
      {nonExistentProperty}
    </div>
  );
};

import React, { useState, useEffect } from "react";

export const ComponentThatThrowsError = () => {
  throw new Error("This component always throws an error");
};

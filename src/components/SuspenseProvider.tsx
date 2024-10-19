import React from "react";
import { Suspense } from "react";

const SuspenseProvider = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default SuspenseProvider;

import React from "react";
import dynamic from "next/dynamic";

const Auth = dynamic(() => import("@/components/Auth"), {
  ssr: false,
});

const Signup = () => {
  return (
    <div>
      <Auth type="signup" />
    </div>
  );
};

export default Signup;

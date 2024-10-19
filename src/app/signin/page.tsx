import React from "react";
import dynamic from "next/dynamic";

const Auth = dynamic(() => import("@/components/Auth"), {
  ssr: false,
});

const Signin = () => {
  return (
    <div>
      <Auth type="signin" />
    </div>
  );
};

export default Signin;

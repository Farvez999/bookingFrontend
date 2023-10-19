"use client";
import Image from "next/image";
import React from "react";

const error = () => {
  return (
    <div>
      <Image
        alt="error"
        height={300}
        width={500}
        src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?size=626&ext=jpg&ga=GA1.1.871306277.1697727340&semt=sph"
      />
    </div>
  );
};

export default error;

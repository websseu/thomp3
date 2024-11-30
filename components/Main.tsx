import React from "react";

type MainProps = {
  children: React.ReactNode;
};

export default function Main({ children }: MainProps) {
  return <main className="main__container">{children}</main>;
}

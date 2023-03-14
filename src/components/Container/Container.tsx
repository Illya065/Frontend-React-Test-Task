import React from "react";
import classes from "./Container.module.css";

interface IContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: IContainerProps): JSX.Element => {
  return <div className={classes.container}>{children}</div>;
};

export default Container;

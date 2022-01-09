import React from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";

import Styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={Styles["loader-wrapper"]}>
      <Loading3QuartersOutlined style={{ fontSize: "3em" }} spin />
    </div>
  );
};

export default Loader;

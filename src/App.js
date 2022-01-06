import React, { useState } from "react";
import { useSelector } from "react-redux";
import Styles from "./App.module.scss";
import { FileUpload, Sidebar, Graph,Settings } from "./components";

function App() {
  const uploaded = useSelector((state) => state.data.uploaded);
  const [visible, setVisible] = useState(!uploaded);

  return (
    <>
      <FileUpload visible={visible} setVisible={setVisible} />
      <main className={Styles["App-wrapper"]}>
        <Sidebar setVisible={setVisible}/>
        <div className={Styles["graph-container"]}>
          <Graph />
          <Settings />
        </div>
      </main>
    </>
  );
}

export default App;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Styles from "./App.module.scss";
import { FileUpload, Sidebar, Graph } from "./components";

function App() {
  const uploaded = useSelector((state) => state.data.uploaded);
  const [visible, setVisible] = useState(!uploaded);

  return (
    <>
      <FileUpload visible={visible} setVisible={setVisible} />
      <main className={Styles["App-wrapper"]}>
        <Sidebar />
        <div className={Styles["graph-container"]}>
          {/* <h1>Graphs are gonna be here! 🔥</h1> */}
          <Graph />
        </div>
      </main>
    </>
  );
}

export default App;

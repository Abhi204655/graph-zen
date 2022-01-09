import React, { useState } from "react";
import { RiFileCopyLine, RiFileCopyFill } from "react-icons/ri";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, message } from "antd";
import Styles from "./embed-core.module.scss";

import { createEmbedId } from "../../../app/slices/chartSlice";

import { useSelector, useDispatch } from "react-redux";

const EmbedCore = () => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.chart.data);
  const embedLoading = useSelector((state) => state.chart.embedLoading);
  const options = useSelector((state) => state.chart.options);
  const data = useSelector((state) => state.chart.data);
  const embedId = useSelector((state) => state.chart.embedId);
  const [copied, setCopied] = useState(false);

  const handleEmbedClick = () => {
    const payload = {
      data,
      options,
      embedId: embedId,
      regenerate: embedId ? true : false,
    };
    dispatch(createEmbedId(payload));
  };

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://graph-zen.netlify.app/"
      : "http://localhost:3000/";

  const getURL = () => {
    if (embedId) {
      return `${baseUrl}embed/${embedId}`;
    }
    return "{YOUR_EMBED_ID_GOES_HERE}";
  };

  const getEmbedCode = () => {
    let url = `${baseUrl}embed/`;
    if (!embedId) {
      url += "{YOUR_CODE_GOES_HERE}";
    } else {
      url = `${url}${embedId}`;
    }
    return `<iframe src="${url}"></iframe>`;
  };

  const handleOnCopy = () => {
    setCopied(true);
    message.success("Link Copied Successfully!");
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className={Styles["code-wrapper"]}>
      <div className={Styles["code-block"]}>
        <p>{"<iframe"}</p>
        <p>
          {`src="`}
          <span className={Styles["URL"]}>{`${getURL()}`}</span>
          {`"`}
        </p>
        <p>{`></iframe>`}</p>
        <CopyToClipboard text={getEmbedCode()} onCopy={handleOnCopy}>
          <Button shape="circle" className={Styles["copy-btn"]}>
            {copied ? <RiFileCopyFill /> : <RiFileCopyLine />}
          </Button>
        </CopyToClipboard>
      </div>
      <Button
        type="primary"
        disabled={chartData.datasets.length === 0}
        loading={embedLoading}
        onClick={handleEmbedClick}
        style={{ marginTop: "1em" }}
      >
        {embedId ? "Update Embed Link" : "Generate Embed Link"}
      </Button>
    </div>
  );
};

export default EmbedCore;

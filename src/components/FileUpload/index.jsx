import React, { useState } from "react";
import Styles from "./file-upload.module.scss";
import * as _util from "../../utils";
import { useDispatch } from "react-redux";

import { Upload, message, Modal, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { upload } from "../../app/slices/dataSlice";

const { Dragger } = Upload;

const FileUpload = ({ visible, setVisible }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleOk = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = evt.target.result;
        const result = _util.getJsonOutOfExcel(data);
        const formattedData = _util.formatData(JSON.parse(result));
        let _dataTypes = _util.getDataTypes(JSON.parse(result)[0]);
        dispatch(upload({ fileName:file.name,data: formattedData, dataTypes: _dataTypes }));
        message.success("file uploaded", 2);
        setVisible(false);
      };
      reader.readAsBinaryString(file);
    } else {
      message.error("File not Uploaded, Please reupload the file!", 2);
    }
  };

  const draggerProps = {
    name: "file",
    multiple: false,
    accept: ".csv,.xlsx,.xls",
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        setFile(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`, 2);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    customRequest({ file, onSuccess }) {
      setTimeout(() => {
        onSuccess(file);
      }, 1000);
      return {
        abort() {
          console.log("upload progress is aborted.");
        },
      };
    },
  };
  return (
    <div className="App">
      <Modal
        title="Upload Data (.xlsx/.csv)"
        visible={visible}
        onOk={() => handleOk}
        onCancel={() => setVisible(false)}
        className={Styles["modal-container"]}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={!file}
          >
            Upload
          </Button>,
        ]}
      >
        <Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Drag & Drop Your File Here</p>
          <p className="ant-upload-hint">
            Only Excel and CSV are supported for now.
          </p>
        </Dragger>
      </Modal>
    </div>
  );
};

export default FileUpload;

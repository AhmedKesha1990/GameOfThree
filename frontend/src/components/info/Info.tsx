import { Card } from "antd";
import React from "react";
import { UsergroupAddOutlined } from "@ant-design/icons";

export const InfoComponent: React.FC = () => {
  return (
    <Card
      title="Please Select Player from left side bar"
      style={{ width: "80%", margin: "30px auto", textAlign: "center" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexFlow: "column",
          height: "50vh",
        }}
      >
        <UsergroupAddOutlined style={{ fontSize: "250px" }} />
      </div>
    </Card>
  );
};

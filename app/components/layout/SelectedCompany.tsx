import React from "react";
import Badge from "antd/es/badge";
import Avatar from "antd/es/avatar";

export default function SelectedCompany({ isActive, logo }: any) {
  return (
    <div className="flex items-center">
      <Badge
        offset={["-5%", "75%"]}
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#6CD818",
        }}
        dot={isActive}
      >
        <Avatar
          src={logo}
          size={40}
          shape="circle"
          style={{ border: "2px solid #3376FF", borderRadius: "50%" }}
        />
      </Badge>
    </div>
  );
}

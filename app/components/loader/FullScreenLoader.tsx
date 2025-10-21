import React from "react";
import { Alert } from "antd";
import Flex from "antd/es/flex";
import Spin from "antd/es/spin";
const contentStyle = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};
const content = <div style={contentStyle} />;
const App = () => (
  <div className="fullscreen-overlay">
    <Spin tip="" size="large">
      {content}
    </Spin>
  </div>
);
export default App;

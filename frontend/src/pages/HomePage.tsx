import { Button, Space, Typography } from "antd";
import type React from "react";
import { useMessage, useToken } from "../utils/StateManager";

const HomePage: React.FC = () => {
  const messageApi = useMessage(s => s.messageApi)
  const setToken = useToken(s => s.setToken)
  const token = useToken(s => s.token)


  return <Space direction="vertical" style={{
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    columnGap: 0
  }}>
    <Typography.Title level={1}>
      Hello here 🥦
    </Typography.Title>
    <Button href="plays/" variant="filled" shape="round" color="pink" size="large" >
      plays
    </Button>
    {token == "" ? <Button href="/login/" variant="filled" shape="round" color="pink" size="large" >
      login
    </Button> :
      <Button onClick={() => {
        setToken("")
        messageApi?.success("you are free!")
      }} variant="filled" shape="round" color="red" size="middle" >
        logout
      </Button>}
  </Space>
}

export default HomePage 
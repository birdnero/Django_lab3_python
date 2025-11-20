import type React from "react";
import { useEffect, useState } from "react";
import type { Play } from "../utils/DtoUtils";
import { getQuery } from "../utils/RestUtils";
import { Button, Skeleton, Space, Typography } from "antd";
import { colors } from "../config";
import BackButton from "./components/BackButton";



const PlayLink: React.FC<{
  play: Play
}> = ({ play }) => {


  return (<Button href={"/plays/" + play.play_id.toString()} variant="filled" shape="round" color="pink" size="middle">
    {play.name}
  </Button>)
}

const PlaysPage: React.FC = () => {
  const [data, setData] = useState<Play[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getQuery("api/plays/").then(e => {
      if (e !== null) {
        setData((e as Play[]).sort((a, b) => a.play_id - b.play_id))
        setLoading(false)
      }
    })
  }, [])

  return <div
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
    }}>
    <BackButton />
    <Typography.Title level={1}>
      All plays ever
    </Typography.Title>

    {data.length > 0 || loading ? <Space
      direction="horizontal"
      wrap
      size="middle"
      style={{
        padding: 16,
        backgroundColor: colors.secondary,
        borderRadius: 32,
        maxWidth: '720px',
        marginBottom: 16
      }}>
      {loading ? <Space direction="horizontal">
        <Skeleton.Button active shape="round" size="default" />
        <Skeleton.Button active shape="round" size="default" />
        <Skeleton.Button active shape="round" size="default" />
      </Space> : null}
      {/* CONTENT HERE */}
      {data.map(play => <PlayLink play={play} />)}
    </Space> : null
    }

  </div>
}


export default PlaysPage

// (<pre
//         style={{
//           display: "inline-block",
//           maxWidth: "100%",
//           whiteSpace: "pre-wrap",
//           wordBreak: "break-word"
//         }} key={play.play_id}>{JSON.stringify(play, null, 3)}</pre>)
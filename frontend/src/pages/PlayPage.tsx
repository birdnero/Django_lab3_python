import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuery, putQuery } from "../utils/RestUtils";
import { type Genre, type Play } from '../utils/DtoUtils';
import { Button, Input, message, Select, Space, Typography } from "antd";
import BackButton from "./components/BackButton";
import { colors } from "../config";
import { ClockCircleOutlined } from "@ant-design/icons";

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const hoursPart = `${hours} год`
  const minsPart = `${mins} хв`

  return [hoursPart, minsPart].filter(Boolean).join(' ');
}

function parseTimeString(str: string) {
  const match = str.match(/^(\d*)\s*год\s*(\d*)\s*хв$/);

  if (!match) return null;

  let hours = parseInt(match[1].slice(0, 2), 10);
  let minutes = parseInt(match[2].slice(0, 2), 10);
  if (minutes > 59) {
    minutes = 59
  }
  if (Number.isNaN(minutes)) {
    minutes = 0
  }
  if (Number.isNaN(hours)) {
    hours = 0
  }

  return [hours, minutes];
}

const PlayPage: React.FC = () => {
  const params = useParams<{ playid: string }>();
  const [data, setData] = useState<Play | null>(null)
  const [messageApi, contextHolder] = message.useMessage();
  const [genres, setGenres] = useState<Genre[] | null>(null)
  const [isChanged, setChanged] = useState<boolean>(false)


  const navigate = useNavigate()
  useEffect(() => {
    getQuery(`api/plays/${params.playid}`).then(e => {
      if (e) {
        setData(e as Play)
      } else {
        navigate("/error")
      }
    })
    getQuery(`api/genres`).then(e => {
      if (e) {
        setGenres(e as Genre[])
      }
    })
  }, [params.playid, navigate])

  const changeField = <T,>(value: T, field: string) => setData(d => {
    if (d) {
      const dn: Play = {
        ...d,
        [field]: value
      }
      setChanged(true)
      return dn
    }
    return d
  })

  const saveFields = () => {
    if (data) {
      const Data: Play = {
        ...data,
        genre: typeof data.genre === "number" ? data.genre : data.genre.genre_id
      }
      putQuery(`api/plays/${Data.play_id}/`, Data).then(r => r ? messageApi.success("succesfully saved!") : messageApi.error("error ocurred")).then(() => setChanged(false))
    }
  }

  return <>
    {contextHolder}
    <BackButton />
    <Space wrap style={{ width: "100%", height: "100%", justifyContent: "center", alignContent: "center" }}>
      <Space direction="vertical" size={0} style={{
        alignItems: "left",
        width: "fit-content",
        padding: 32,
        paddingTop: 0,
        paddingBottom: 24,
        borderRadius: 32,
        backgroundColor: colors.secondary
      }}>
        {data ? <>
          <Input.TextArea
            autoSize={{
              minRows: 1
            }}
            value={data.name}
            onChange={v => changeField(v.currentTarget.value, "name")}
            variant="borderless"
            style={{
              fontSize: 42,
              marginBlockStart: "0.67em",
              marginBlockEnd: " 0.67em",
              marginBottom: "0.5em",
              color: colors["primary-txt"],
              fontWeight: 400,
              lineHeight: 1.1904761904761905,
              padding: 0
            }}
          />
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Space size={0} direction="vertical">
              <Space id="author-duration" size="middle">
                <Space style={{
                  alignItems: "start"
                }}>
                  <Typography>
                    Автор:
                  </Typography>
                  <Input.TextArea
                    autoSize={{
                      minRows: 1
                    }}
                    value={data?.author}
                    onChange={v => changeField(v.currentTarget.value, "author")}
                    variant="borderless"
                    style={{
                      width: 120,
                      padding: 0
                    }}
                  />
                </Space>
                <Space>
                  <ClockCircleOutlined style={{
                    fontSize: 20,
                    color: colors["primary-txt"],
                  }} />
                  <Space size={0} wrap style={{ alignContent: "start", width: "fit-content" }}>
                  </Space>
                  <Input
                    value={formatMinutes(data.duration)}
                    onChange={v => {
                      const time = parseTimeString(v.currentTarget.value)
                      if (time) {
                        const inputEl = v.currentTarget
                        const curpos = inputEl.selectionStart || 0
                        changeField(time[0] * 60 + time[1], "duration")
                        setTimeout(() => {
                          inputEl.setSelectionRange(curpos, curpos)
                        }, 0)
                      }
                    }}
                    variant="borderless"
                    style={{
                      width: 120,
                      padding: 0
                    }} />
                </Space>
              </Space>
              <Space size={0}>
                <Typography>
                  Жанр:
                </Typography>
                <Select className="select-edit"
                  suffixIcon={false}
                  popupMatchSelectWidth={false}
                  options={genres?.map(genre => ({ value: genre.genre_id, label: <Typography>{genre.name}</Typography> }))}
                  value={(typeof data.genre) == "number" ? data.genre : data.genre.genre_id}
                  onChange={v => changeField(v, "genre")}
                  variant="borderless"
                  style={{
                    width: "fit-content",
                    padding: 0
                  }}
                />
              </Space>
            </Space>
            <Input.TextArea
              autoSize={{ minRows: 1 }}
              value={data.description}
              onChange={v => changeField(v.currentTarget.value, "description")}
              variant="borderless"
              style={{ padding: 0 }} />

          </Space>
          {isChanged ? <Space style={{ width: "100%", justifyContent: "center", marginTop: 32 }}>
            {data ? <Button color="pink" variant="solid" shape="round" onClick={saveFields}>
              Зберегти
            </Button> : null}
          </Space> : null}
        </> : null}
      </Space>
    </Space>
  </>
}

export default PlayPage;

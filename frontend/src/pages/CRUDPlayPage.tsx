import type React from "react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteQuery, getQuery } from "../utils/RestUtils";
import { type Actor, type Director, type Genre, type Play } from "../utils/ApiDtos";
import { Button, Popover, Space, Tooltip, Typography, Upload } from "antd";
import { FloatingButton } from "../components/FloatingButton";
import { colors } from "../config";
import { DeleteFilled, FileImageFilled, LeftCircleFilled, UndoOutlined } from "@ant-design/icons";
import { changeField, checkSame } from "../utils/HookFolders";
import { Container } from "../components/Containers";
import { useInFirst, useMessage, usePlayState } from "../utils/StateManager";
import { FloatingContainer } from "../components/FloatingContainer";
import { PlayArrowMessageGeneralWarning } from "../components/PlayArrows";
import NameField from "../components/CRUDPlayPage/NameField";
import AuthorField from "../components/CRUDPlayPage/AuthorField";
import DurationField from "../components/CRUDPlayPage/DurationField";
import GenreField from "../components/CRUDPlayPage/GenreField";
import ActorsField from "../components/CRUDPlayPage/ActorsField";
import DirectosField from "../components/CRUDPlayPage/DirectosField";
import DescriptionField from "../components/CRUDPlayPage/DescriptionField";
import ActionButton from "../components/CRUDPlayPage/ActionButton";


//? independent features >>>>
export const objA2numA = <T,>(arr: T[] | number[], idField: keyof T): number[] => {
  if (arr.length > 0 && typeof arr[0] !== "number")
    return arr.map((o) => (o as T)[idField as keyof T] as number);
  return arr as number[];
};

export const obj2num = <T,>(el: T | number, idField: keyof T): number => {
  if (typeof el !== "number")
    return (el as T)[idField as keyof T] as number;
  return el as number;
};

type boolObj<T> = {
  [K in keyof T]?: boolean;
};

const checkValidation = <T,>(boolData: boolObj<T>) => Object.keys(boolData).every((k) => boolData[k as keyof boolObj<T>])

type CRUDPageActionsT = "delete" | "undo"

interface CRUDPageProps<T> {
  // кнопка яка появляється, при зміні даних, якщо вони відповідають правилам валідації
  saveBtn: {
    text: string,
    action: () => any
  },
  // кнопки доступних дій (згори)
  actions?: CRUDPageActionsT[],
  tooltip?: boolean,
  warnUnsaved?: boolean,
}




//? dependent from play features >>>>
export const formPlayData = (data: Play): FormData => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("author", data.author);
  formData.append("description", data.description);
  formData.append("duration", data.duration.toString());
  formData.append("genre_id", obj2num<Genre>(data.genre ?? 0, "genre_id").toString())


  objA2numA(data.actors, "actor_id").forEach((id) =>
    formData.append("actor_ids", id.toString())
  );
  objA2numA(data.directors, "director_id").forEach((id) =>
    formData.append("director_ids", id.toString())
  );

  if (data.image instanceof File) {
    // if (data.image != null) {
    formData.append("image_file", data.image);
  } else if (typeof data.image === "string") {
    formData.append("image_url", data.image);
  } else {
    formData.append("image_url", "");
  }

  return formData
}




const CRUDPlayPage: React.FC<CRUDPageProps<Play>> = ({
  saveBtn,
  actions,
  tooltip = true,
  warnUnsaved = true,
}) => {
  const messageApi = useMessage((s) => s.messageApi);
  const inFirst = useInFirst((s) => s.inFirst);
  const setChecked = useInFirst((s) => s.setChecked);
  const navigate = useNavigate();
  const refScope = useRef<HTMLDivElement>(null);

  const [filePopover, setFilePopover] = useState(false);


  const data = usePlayState(s => s.data)
  const valid = usePlayState(s => s.isValid)
  const realvalid = usePlayState(s => s.valid)
  const changed = usePlayState(s => s.isChanged)


  const undo = usePlayState(s => s.undo)


  const handleDelete = (id: number) =>
    deleteQuery(`api/plays/${id}/`).then((r) =>
      r
        ? (messageApi?.success("видалено!", 1).then(() => navigate(-1)), null)
        : messageApi?.error("щось пішло не так(", 0.5)
    );


  useEffect(() => {
    if (warnUnsaved) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (changed) {
          e.preventDefault()
          e.returnValue = ""
        }
      }
      window.addEventListener("beforeunload", handleBeforeUnload)
      return () => { window.removeEventListener("beforeunload", handleBeforeUnload) }
    }
  }, [data])

  useEffect(()=>{
    console.log(realvalid, "and", valid);
    
  }, [realvalid])

  return (
    <>
      <FloatingButton Icon={LeftCircleFilled} onClick={() => navigate(-1)} />
      <Container
        renderItem="div"
        props={{
          ref: refScope,
          style: {
            overflow: "hidden",
            // backgroundImage: data?.image ? `url(${data.image})` : undefined,
            backgroundImage: data?.image
              ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(http://localhost:8000/${data.image})`
              : undefined,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          },
        }}
        template="outer"
        containerSize="fullsize"
      >
        <Tooltip title={tooltip && inFirst && <Typography style={{ color: colors.primary, cursor: "pointer" }} onClick={() => setChecked()}>ти можеш редагувати поля! спробуй!!!🤩 (натисни на мене, щоб я не відображався😢)</Typography>}>
          <div>
            <Container
              template="inner"
              containerSize="compact"
              props={{ style: { paddingTop: 16, position: "relative" } }}
            >
              <PlayArrowMessageGeneralWarning refScope={refScope} />
              {data ? (
                <>
                  {/* TOP BAR BUTTONS (INSIDE THE CONTAINER/NEAR DELETE) */}
                  <FloatingContainer
                    style={{
                      left: undefined,
                      right: 24,
                      top: 12,
                    }}
                  >
                    <Popover
                      open={filePopover}
                      onOpenChange={(v) => setFilePopover(v)}
                      styles={{ body: { borderRadius: 16 } }}
                      trigger="click"
                      content={<Space direction="vertical" size="small">
                        <Upload

                          maxCount={1}
                          disabled={(data.image != "" && data.image != null)}
                          // onRemove={() => changeField(null, "image", setData)}
                          beforeUpload={() => false}
                          accept="image/**"
                          onChange={({ file }) => {
                            console.log(file);

                            if (file.status != "done" || !file || !file.originFileObj) return;
                            console.log(file);

                            const readFile = file.originFileObj as File;

                            // changeField(readFile, "image", setData)
                            console.log(data);

                          }}
                        >
                          <Button
                            style={{ backgroundColor: colors.primary }}
                            variant="filled"
                            type="link"
                            shape="round"
                            color="pink">
                            додати фото
                          </Button>
                        </Upload>
                      </Space>}><div>

                        <Tooltip open={filePopover ? false : undefined} trigger={"hover"} title={<Typography style={{ color: colors.primary, cursor: "default" }}>дії з фото</Typography>}>
                          <div>
                            <FloatingButton
                              inContainer
                              Icon={FileImageFilled}
                              onClick={() => { }}
                              style={{
                                fontSize: 24,
                                color: colors["primary-txt"] + "79",
                                // display: "none"
                              }}
                              props={{ className: "animated-icon-self-accent" }}
                            >
                            </FloatingButton>
                          </div>
                        </Tooltip>
                      </div>
                    </Popover>
                    {actions?.includes("undo") && changed && (
                      <FloatingButton
                        style={{
                          fontSize: 24,
                          color: colors["primary-txt"] + "79",
                        }}
                        inContainer
                        Icon={UndoOutlined}
                        onClick={() => undo()}
                        props={{ className: "animated-icon-self-accent" }}
                      />
                    )}
                    {actions?.includes("delete") &&
                      <Popover
                        styles={{ body: { borderRadius: 16 } }}
                        title="Реально видалиш?"
                        trigger="click"
                        content={<Button
                          variant="filled"
                          type="link"
                          shape="round"
                          color="red"
                          style={{ backgroundColor: colors.primary }}
                          onClick={() => handleDelete(data.play_id)}>
                          так я тверезий
                        </Button>}>
                        <div>
                          <FloatingButton
                            style={{
                              fontSize: 24,
                              color: colors["primary-txt"] + "79",
                            }}
                            inContainer
                            Icon={DeleteFilled}
                            onClick={() => { }}
                            props={{ className: "animated-icon-self-accent" }}
                          />
                        </div>
                      </Popover>}
                  </FloatingContainer>
                  <NameField />
                  <Space direction="vertical" size="middle" style={{ width: "100%", justifyContent: "start" }} >
                    <div className="grid-auto" >
                      <AuthorField refScope={refScope} />
                      <DurationField refScope={refScope} />
                      <GenreField />
                      <div />
                      <ActorsField />
                      <DirectosField />
                    </div>
                    <DescriptionField />
                    <ActionButton active={changed && !valid} onClick={saveBtn.action} text={saveBtn.text} />

                    {/* TODO: REPLACE TO NORMAL */}
                    <Space>
                      <FloatingButton
                        style={{
                          fontSize: 24,
                          color: colors["primary-txt"] + "79",
                        }}
                        inContainer
                        Icon={DeleteFilled}
                        onClick={() => {
                          // TODO changeField(null, "image", setData)
                        }}
                        props={{ className: "animated-icon-self-accent" }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          // TODO
                          // setData((prev) => {
                          //   if (!prev) return prev;
                          //   return {
                          //     ...prev,
                          //     image: file,
                          //   };
                          // });
                        }}
                      />
                    </Space>
                  </Space>
                </>
              ) : null}
            </Container>
          </div>
        </Tooltip>
      </Container >
    </>
  );
};

export default CRUDPlayPage;

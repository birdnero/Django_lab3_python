import { EmptyPlay } from "../utils/ApiDtos";
import { postQuery } from "../utils/RestUtils";
import { useMessage } from "../utils/StateManager";
import CRUDPlayPage, { formPlayData } from "./CRUDPlayPage"


const PlayCreatePage = () => {
    const messageApi = useMessage((s) => s.messageApi);

    return <>
        <CRUDPlayPage
            saveBtn={{
                text: "Зберегти зміни",
                action: (data, _, setData) => {
                    if (!data) return;
                    const formData = formPlayData(data)

                    postQuery(`api/plays/`, formData).then((r) =>
                        r
                            ?
                            (messageApi?.success("успішно створено!", 0.5), setData(EmptyPlay), 0)
                            : (messageApi?.error("щось пішло не так(", 0.5), 0)
                    );
                },
            }}
            setInitalData={() => Promise.resolve((EmptyPlay))}
            tooltip={false}
            warnUnsaved={false}
        />
    </>
}

export default PlayCreatePage
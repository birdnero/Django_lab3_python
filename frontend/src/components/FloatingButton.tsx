import { EditFilled } from "@ant-design/icons"
import { colors } from "../config"
import type React from "react"
import type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon"
import type { PropsWithChildren } from "react"
import { Space, type SpaceProps } from "antd"

const floatDefaultStyle: React.CSSProperties = {
    zIndex: 2,
    position: "absolute",
    left: 16,
    top: 16,
}

const defaultFloatBtnStyle: React.CSSProperties = {
    fontSize: "40px",
    color: colors["floating-btn"]
}

//TODO
export const FloatingButtonContainer: React.FC<PropsWithChildren<{
    style?: React.CSSProperties,
    space?: SpaceProps
}>> = ({ children, style, space }) => {

    return <Space direction="horizontal" size="middle" {...space} style={{
        ...floatDefaultStyle,
        ...style
    }} >
        {children}
    </Space>
}

export const FloatingButton: React.FC<{
    Icon: React.ForwardRefExoticComponent<Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    inContainer?: boolean,
    style?: React.CSSProperties
}> = ({ onClick, style, inContainer, Icon }) => {

    const positionStyle: React.CSSProperties = !inContainer ? floatDefaultStyle : { position: "relative" }

    return <div className="animated-icon"
        style={{
            ...defaultFloatBtnStyle,
            ...positionStyle,
            ...style
        }}
        onClick={onClick} >
        <EditFilled />
        <Icon className="animated-icon-self" style={{ transition: "100ms" }} />
    </div>
}
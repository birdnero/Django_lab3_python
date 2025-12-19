import type React from "react";
import type { PropsWithChildren } from "react";
import { colors } from "../config";

export const ChartDivStyles: {
  template: {
    screen: React.CSSProperties;
    chart: React.CSSProperties;
  };
} = {
  template: {
    screen: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 32,
      paddingTop: 32,
    },
    chart: {
      margin: 20,
      backgroundColor: colors.secondary,
      width: "80%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: 32,
      borderRadius: 32,
    },
  },
};

export interface ChartContainerProps {
  template?: "screen" | "chart";
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

export const ChartDiv = ({
  template = "screen",
  props,
  children,
}: PropsWithChildren<ChartContainerProps>) => {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        ...ChartDivStyles.template[template],
        ...props?.style,
      }}
    >
      {children}
    </div>
  );
};

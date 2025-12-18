import { colors } from "../../../config";

export const baseLayout: Partial<Plotly.Layout> = {
  paper_bgcolor: colors.secondary,
  plot_bgcolor: colors.secondary,

  hoverlabel: {
    bgcolor: "fff",
    font: { color: "#000" },
  },
};

export const baseProps = {
  useResizeHandler: true,
  style: { width: "100%", height: "100%" },
  config: {
    displayModeBar: false,
    responsive: true,
  },
};

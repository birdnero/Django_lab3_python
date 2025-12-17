import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const baseProps = {
  useResizeHandler: true,
  style: { width: "100%", height: "100%" },
};

export function MyHeatmapChart() {
  const data: Plotly.Data[] = [
    {
      type: "heatmap",
      x: ["Драма", "Комедія", "Балет"],
      y: ["20–30", "30–40", "40+"],
      z: [
        [2, 5, 1],
        [3, 2, 4],
        [6, 1, 2],
      ],
    },
  ];

  const layout: Partial<Plotly.Layout> = {
    title: { text: "Вік акторів × Жанр вистави" },
  };

  return <Plot data={data} layout={layout} {...baseProps} />;
}

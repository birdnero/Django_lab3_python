import Plotly from "plotly.js-dist-min";
import { useState, useEffect } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import { getQuery } from "../../../utils/RestUtils";

const Plot = createPlotlyComponent(Plotly);

type RatingsResponse = {
  rating: number[];
  ratings_count: number[];
};

export default function MyRadarChart() {
  const [plotData, setPlotData] = useState<Plotly.Data[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getQuery<RatingsResponse>(`api/plays/stats/ratings/?return_type=list`)
      .then((res) => {
        if (!res) return;

        const plot: Plotly.Data = {
          type: "scatterpolar",
          r: res.ratings_count,
          theta: res.rating.map(r => `${r}⭐`),
          fill: "toself",
        };

        setPlotData([plot]);
      })
      .finally(() => setLoading(false));
  }, []);


  const layout: Partial<Plotly.Layout> = {
    title: { text: "Розподіл оцінок вистав" },
    polar: {
      radialaxis: { visible: true },
    },
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Plot
      data={plotData}
      layout={{ ...layout, autosize: true }}
      useResizeHandler
      style={{ width: "100%", height: "100%" }}
    />
  );
}

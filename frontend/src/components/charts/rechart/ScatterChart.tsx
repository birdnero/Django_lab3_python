import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Varialbles } from "../../../config";
import { useToken } from "../../../utils/StateManager";

type DataItem = {
  likes_amount: number;
  rating: number;
};

export default function MyScatterChart() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${Varialbles.backend}api/plays/stats/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useToken.getState().token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <ScatterChart>
          <CartesianGrid />
          <XAxis dataKey="likes_amount" name="Likes" />
          <YAxis dataKey="rating" name="Rating" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

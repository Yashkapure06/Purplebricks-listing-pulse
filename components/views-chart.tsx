"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Weekly views trend. Client component because Recharts needs the DOM.
 * A line conveys the week-over-week trajectory better than discrete bars;
 * a faint area fill under the line adds depth. Most recent point is emphasised.
 */
export function ViewsChart({ weekly }: { weekly: number[] }) {
  const data = weekly.map((views, i) => ({
    label: i === weekly.length - 1 ? "This week" : `Week ${i + 1}`,
    views,
  }));

  const accent = "#4c0f78";
  const axis = "rgba(20,12,40,0.18)";
  const grid = "rgba(20,12,40,0.07)";

  return (
    <Card className="flex flex-col bg-card-2">
      <CardHeader>
        <CardTitle>Weekly views</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full min-h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 12, right: 12, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accent} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke={grid}
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tickLine={true}
                axisLine={{ stroke: axis }}
                tick={{ fill: "#6b6678", fontSize: 12 }}
                padding={{ left: 12, right: 12 }}
              />
              <YAxis
                tickLine={true}
                axisLine={{ stroke: axis }}
                tick={{ fill: "#6b6678", fontSize: 12 }}
                width={48}
                tickFormatter={(v: number) => v.toLocaleString("en-GB")}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ stroke: axis, strokeWidth: 1 }}
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid rgba(20,12,40,0.10)",
                  borderRadius: 8,
                  color: "#1f1b2e",
                  fontSize: 12,
                  boxShadow: "0 4px 16px rgba(20,12,40,0.08)",
                }}
                labelStyle={{ color: "#6b6678" }}
              />
              <Area
                type="monotone"
                dataKey="views"
                name="Views"
                stroke={accent}
                strokeWidth={2.5}
                fill="url(#viewsFill)"
                dot={{ r: 3, fill: accent, strokeWidth: 0 }}
                activeDot={{
                  r: 5,
                  fill: accent,
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

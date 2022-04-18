import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface CharProps {
  coinId: string;
}

function Chart({ coinId }: CharProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          series={[
            {
              name: "price",
              data: data?.map((price => price.close)) ?? [],
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            theme: {
              mode:  isDark ? "dark" : "light",
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              labels: {
                show: false,
                datetimeFormatter: { month: "mmm 'yy" },
              },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#00ff00',
                  downward : '#ff0000'
                }
              }
            },
            colors: ['#0fbcf9'],
          }}
        />
      )}
    </div>
  );
}

export default Chart;
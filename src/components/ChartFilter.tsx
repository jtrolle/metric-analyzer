import React, { useState } from 'react';
import { Input } from 'reactstrap';
import AxisTick from './AxisTick';

import {
    BarChart,
    LineChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from 'recharts';

interface ownProps {
    width: number
    data: Array<any>
    colors: Array<string>
    keys: Array<string>
    type: 'line' | 'bar'
}

const ChartFilter: React.FC<ownProps> = ({ width, data, keys, colors, type }: ownProps) => {
    const [filterKeys, setFilters] = useState(keys);

    // @ts-ignore
    const MyChart = type === 'bar' ? BarChart : LineChart;
    const MySerie = type === 'bar' ? Bar : Line;

    function toggleFilter(key: string) {
        const f = [...filterKeys];
        var index = f.indexOf(key);

        if (index === -1) {
            f.push(key);
        } else {
            f.splice(index, 1);
        }
        setFilters(f);
    }


    return <div>
        <MyChart
            width={width}
            height={300}
            data={data}
            margin={{
                top: 20, right: 30, left: 20, bottom: 5,
            }}
            barCategoryGap={0}
            barGap={0}
        >
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            {
                keys.map(function (key, index) {
                    if (filterKeys.indexOf(key) > -1) {
                        const conf = type === 'bar' ? {
                            fill: colors[index],
                        } : {
                                stroke: colors[index],
                                dot: false,
                                type: "monotone"
                            }
                        // @ts-ignore
                        return <MySerie key={key} dataKey={key} stackId="a" {...conf} />
                    }
                })
            }
        </MyChart>
        <div>
            {keys.map(function (key) {
                return <div key={key}>
                    <Input
                        type="checkbox"
                        value={key}
                        checked={filterKeys.indexOf(key) > -1}
                        onChange={() => toggleFilter(key)}
                    /> {key}
                </div>
            })}
        </div>
    </div>
}

export default ChartFilter;
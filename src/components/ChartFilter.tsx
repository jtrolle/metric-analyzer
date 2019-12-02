import React, { useState } from 'react';
import { FormGroup, Input, Table, Row, Col, Label } from 'reactstrap';

import {
    BarChart,
    LineChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';

interface ownProps {
    width: number
    data: Array<any>
    colors: Array<string>
    keys: Array<string>
    type: 'line' | 'bar'
    initialFilters?: Array<string>
}

function computeMeta(data: Array<object>, filterKeys: Array<string>) {
    const meta: any = {};

    filterKeys.forEach(function (key) {
        // @ts-ignore
        const initialValue = data[0][key];
        meta[key] = {
            min: initialValue,
            max: initialValue,
            average: []
        }
    });

    data.forEach(function(m) {
        filterKeys.forEach(function (key) {
            // @ts-ignore
            const value = m[key];
            if (value !== null && value !== undefined) {
                meta[key].min = meta[key].min < value ? meta[key].min : value;
                meta[key].max = meta[key].max > value ? meta[key].max : value;
                meta[key].average.push(value);
            }
        })
    });

    filterKeys.forEach(function (key) {
        const sum = meta[key].average.reduce(function (a: number, b: number) { return a + b; }, 0);
        meta[key].average = Math.round(sum / meta[key].average.length);
    })


    return meta;
}

const ChartFilter: React.FC<ownProps> = ({ width, data, keys, colors, type, initialFilters }: ownProps) => {
    const init = initialFilters || keys;
    const [filterKeys, setFilters] = useState(init);

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

    const meta: any = computeMeta(data, keys);
    
    return <div>
        <Row>
            <Col>
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
                    <XAxis dataKey="time" minTickGap={20} tickFormatter={function(label) {
                        const t = label.split(' ');
                        return t[1] || label
                    }} />
                    <YAxis />
                    <Tooltip />
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
                                return <MySerie isAnimationActive={false} key={key} dataKey={key} stackId="a" {...conf} />
                            }
                        })
                    }
                </MyChart>
            </Col>
            <Col>
                <Table size="sm">
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Min.</td>
                            <td>Max.</td>
                            <td>Average</td>
                        </tr>
                        {keys.map(function (key, index) {
                            return <tr key={ key }>
                                <td>
                                    <FormGroup check inline>
                                        <Label check>
                                            <span
                                                className={`chart-legend ${type}`}
                                                style={{
                                                    color: colors[index]
                                                }}
                                            />
                                            <Input
                                                type="checkbox"
                                                value={key}
                                                checked={filterKeys.indexOf(key) > -1}
                                                onChange={() => toggleFilter(key)}
                                            /> {key}
                                        </Label>
                                    </FormGroup>
                                </td>
                                <td>{meta[key].min}</td>
                                <td>{meta[key].max}</td>
                                <td>{meta[key].average}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            
            </Col>
        </Row>
    </div>
}

export default ChartFilter;
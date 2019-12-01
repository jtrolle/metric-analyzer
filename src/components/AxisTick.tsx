import React from 'react';
import { ContentRenderer } from 'recharts';

type test = ContentRenderer<ownProps>

interface LabelPayload {
    value: string
}

interface ownProps {
    x: number
    y: number
    payload: LabelPayload
}

const AxisTick: React.FC<any> = ({ x, y, payload}: any) => {

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
            </g>
        );
}

export default AxisTick;
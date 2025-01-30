"use client"
import React from 'react';
import Tooltip from '@uiw/react-tooltip';
import HeatMap from '@uiw/react-heat-map';
import { convertDateToString } from '@/lib/utils';

type Props = {
    data: {
        createdAt: Date;
        count: number;
    }[];
}

const panelColors = { 0: '#4b515c', 4: '#7BC96F', 2: '#C6E48B', 6: '#239A3B', 12: '#196127'};

const SubmissionsHeatMap = (props: Props) => {
    const formattedDates = props.data.map((item) => ({ date: convertDateToString(item.createdAt), count: item.count }));

  return (
    <HeatMap
      value={formattedDates}
      width="100%"
      style={{ color: '#888'}}
      panelColors={panelColors}
      startDate={new Date('2025/01/01')}
      rectRender={(props, data) => {
        // if (!data.count) return <rect {...props} />;
        return (
          <Tooltip placement="top" content={`count: ${data.count || 0}`}>
            <rect {...props} />
          </Tooltip>
        );
      }}
    />
  )
};

export default SubmissionsHeatMap
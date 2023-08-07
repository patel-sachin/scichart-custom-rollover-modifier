import React from 'react';
import { getChartData } from './ChartData';
import { CustomRolloverModifier } from './CustomRolloverModifier';
import './SingleChart.css';

import {
  EAutoRange,
  FastLineRenderableSeries,
  NumberRange,
  NumericAxis,
  SciChartSurface,
  XyDataSeries
} from 'scichart';

export const SingleChart = () => {
  React.useEffect(() => {
    const initChart = async () => {
      const { sciChartSurface, wasmContext } = await SciChartSurface.create("scichart-container", {
        title: 'Place Rollover and persist on CTRL+Click',
        titleStyle: { fontSize: 16 },
        disableAspect: true,
      });

      // For the example to work, axis must have EAutoRange.Always
      sciChartSurface.xAxes.add(new NumericAxis(wasmContext, { autoRange: EAutoRange.Once, axisTitle: 'X Axis' }));
      sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, { visibleRange: new NumberRange(-2, 0.5), axisTitle: 'Y Axis' })
      );

      const rollover = new CustomRolloverModifier();
      sciChartSurface.chartModifiers.add(rollover);

      const {xValues, yValues} = getChartData();
      const xyDataSeries = new XyDataSeries(wasmContext, {
        xValues,
        yValues,
      });

      sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
          dataSeries: xyDataSeries,
          strokeThickness: 3,
          stroke: '#50C7E0',
        })
      );
    };

    initChart();
  }, []);

  return (
    <div className="chart-outer-container" style={{height: '100%'}}>
      <div id="scichart-container" style={{width: '100%', height: '100%'}}></div>
    </div>
  )
}

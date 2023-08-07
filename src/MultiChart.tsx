import React from 'react';
import { getChartData } from './ChartData';
import { CustomRolloverModifier, ICustomRolloverModifier } from './CustomRolloverModifier';
import './MultiChart.css';

import {
  EAutoRange,
  FastLineRenderableSeries, ModifierMouseArgs,
  NumberRange,
  NumericAxis,
  SciChartSurface, SciChartVerticalGroup,
  XyDataSeries
} from 'scichart';

export const MultiChart = () => {
  React.useEffect(() => {
    const initSingleChart = async (index: number, group: SciChartVerticalGroup) => {
      const { sciChartSurface, wasmContext } = await SciChartSurface.create(`scichart-container-${index}`, {
        title: `(Chart-${index}): Place Rollover and persist on CTRL+Click`,
        titleStyle: { fontSize: 16 },
        disableAspect: true,
      });

      sciChartSurface.xAxes.add(new NumericAxis(wasmContext, { autoRange: EAutoRange.Once, axisTitle: 'X Axis' }));
      sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, { visibleRange: new NumberRange(-2, 0.5), axisTitle: 'Y Axis' })
      );

      const rollOver = new CustomRolloverModifier({modifierGroup: 'group1'});
      sciChartSurface.chartModifiers.add(rollOver);

      const {xValues, yValues} = getChartData();
      const xyDataSeries = new XyDataSeries(wasmContext, {
        xValues,
        yValues,
      });

      sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
          dataSeries: xyDataSeries,
          strokeThickness: 3,
          stroke: index === 0 ? '#50C7E0' : '#29b934',
        })
      );

      group.addSurfaceToGroup(sciChartSurface);
      return rollOver;
    };

    const handleOnHideRollover = (sender: ICustomRolloverModifier, allRolloverModifiers: ICustomRolloverModifier[], args: ModifierMouseArgs) => {
      allRolloverModifiers.filter((modifier) => modifier !== sender)
        .forEach((modifier) => modifier.hideRollover(args));
    };

    const handleOnShowRollover = (sender: ICustomRolloverModifier, allRolloverModifiers: ICustomRolloverModifier[], args: ModifierMouseArgs) => {
      allRolloverModifiers.filter((modifier) => modifier !== sender)
        .forEach((modifier) => modifier.showRollover(args));
    };

    const initMultiChart = async () => {
      const group = new SciChartVerticalGroup();
      const promises = [0, 1].map((index) => initSingleChart(index, group));
      const rollOverModifiers = await Promise.all(promises);
      rollOverModifiers.forEach((modifier) => {
        modifier.onShowRollOver = (args: ModifierMouseArgs) => {
          handleOnShowRollover(modifier, rollOverModifiers, args);
        }
        modifier.onHideRollOver = (args: ModifierMouseArgs) => {
          handleOnHideRollover(modifier, rollOverModifiers, args);
        }
      })
    }

    initMultiChart();
  }, []);

  return (
    <div className="chart-outer-container" style={{height: '100%'}}>
      { /* Somehow setting the height to some % value is not working!!!! */}
      {/* <div id="scichart-container-0" className="scichart-container" style={{width: '100%', height: '50%'}}></div> */}
      {/* <div id="scichart-container-1" className="scichart-container" style={{width: '100%', height: '50%'}}></div> */}
      <div id="scichart-container-0" className="scichart-container" style={{width: '98%', height: '500px'}}></div>
      <div id="scichart-container-1" className="scichart-container" style={{width: '98%', height: '500px'}}></div>
    </div>
  )
}

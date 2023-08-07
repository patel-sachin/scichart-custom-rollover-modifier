# Custom RollOver Modifier

Extending the solution provided by SciChart for [this question](https://www.scichart.com/questions/js/scichartjs-programatically-show-rollovermodifier-tooltip-and-keep-it-visible-all-the-time)  located at:
https://codepen.io/scichart/pen/ExOrzod

## Single Chart

This just shows a single chart.
It is pretty much the solution provided by SciChart in the forum.

## Multi Chart

This uses `SciChartVerticalGroup` to render multiple charts (two) as a stack.
A `CustomRollOverModifier` is implemented to make the solution from SciChart work for stacked charts.

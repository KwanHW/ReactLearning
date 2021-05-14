import ChartBar from './ChartBar';
import './Chart.css';

function Chart(props) {
    const dataPointValues = props.dataPoints.map(data => data.value);
    const totalMax = Math.max(...dataPointValues)
    return (
		<div className="chart">
			{props.dataPoints.map((dataPoint) => {
				return <ChartBar
					key={dataPoint.label}
					value={dataPoint.value}
					maxValue={totalMax}
					label={dataPoint.label}
				/>
			})}
		</div>
	); 
}

export default Chart;
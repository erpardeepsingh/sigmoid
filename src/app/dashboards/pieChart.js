import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: this.props.data.map((ele) => Number(ele["CM001"])),
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: this.props.data.map((ele) => ele.advertiserId),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: '100%',
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
        />
      </div>
    );
  }
}

export default ApexChart;

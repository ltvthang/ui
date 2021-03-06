import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Bar } from 'react-chartjs-2';

const options = {
  title: {
    display: true,
    text: 'Passive Analyze Summary',
  },
  responsive: true,
  legend: {
    position: 'bottom',
    labels: {
      fontColor: '#8eacbb',
      // fontColor: `${() => themed({ light: '#36ae', dark: '#DFE151' })}`,
      boxWidth: 20,
      padding: 20,
    },
  },
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

class PassiveAnalyzeChart extends Component {

  state = {
    real_data: null,
  };

  componentDidMount() {
    const content = this.props;
    this.props.axiosStore.instance
      .get('/rest/v1/stat/passive/')
      .then(response => {
        if (response.data.hasOwnProperty('summary')) {
          console.log(response.data);
          this.setState({ real_data: response.data.summary });
        } else {
          this.setState({ error: true });
        }
      })
      .catch(error => this.setState({ error: true }));
  }

  render() {
    let chart = null;
    const real_data = this.state.real_data;
    if (real_data) {
      console.log(real_data);
      const data = {
        labels: real_data['passive_types'],
        datasets: [
          {
            label: 'Number of Passive Analyze',
            backgroundColor: '#5DADE2',
            borderColor: '#0D47A1',
            borderWidth: 2,
            minHeight: 0,
            hoverBackgroundColor: '#0D47A1',
            hoverBorderColor: '#5DADE2',
            data: real_data['values'],
          },
        ],
      };

      console.log(data);
      chart = <Bar data={data} width={100} height={50} options={options} />;
    }

    return <div>{chart}</div>;
  }
}

export default inject('sessStore', 'axiosStore')(observer(PassiveAnalyzeChart));

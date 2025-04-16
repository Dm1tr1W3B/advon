<template>
  <div class="chart">
    <div class="chart__title">Статистика просмотров объявления за месяц</div>
    <div class="chart__period">с {{ this.chartData.labels[0] }} по {{ this.chartData.labels[this.chartData.labels.length - 1] }}</div>
    <div class="chart__body">
      <bar-chart class="chart__container-chart" v-if="trigger" :data='chartData' :options="options" />
      <div class="chart__description">
        <div class="chart__description_item">
          <div class="chart__description_key">
            <Eye class="chart__description_icon" />
            Всего:
          </div>
          <div class="chart__description_value">{{ dataTop.all }}</div>
        </div>
        <div class="chart__description_item">
          <div class="chart__description_key">
            <Eye class="chart__description_icon" />
            Сегодня:
          </div>
          <div class="chart__description_value">{{ dataTop.today }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Eye from "@/assets/images/eye.svg?inline";

export default {
  name: "Chart",
  data() {
    return {
      trigger: false,
      chartData: {
        labels: [],
        datasets: [{
          backgroundColor: '#2575ED',
          data: [],
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true,
            }
          }],
          xAxes: [{
            ticks: {
              display: false,
            },
            gridLines: {
              display: false,
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function(tooltipItems, data) {
              return tooltipItems.yLabel;
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        height: 200,
      }
    };
  },
  props: {
    data: {
      type: Array,
      default() {
        return {};
      },
    },
    dataTop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    Eye,
  },
  methods: {
    iterationData() {
      for (let i = 0; i < this.data.length; i++) {
        this.chartData.labels.unshift(this.data[i].date)
        this.chartData.datasets[0].data.unshift(this.data[i].views)
      }
    }
  },
  mounted() {
    this.iterationData();
    this.trigger = true;
  }
};
</script>

<style lang="scss" scoped>
.chart {
  min-width: 650px;
  &__rotate {
    transform: rotate(270deg);
    max-width: 200px;
    position: absolute;
    bottom: 38px;
  }

  &__title {
    font-size: $g-font-third-size;
    padding-bottom: 8px;
  }

  &__progress {
    background: red;
    height: 10px;
  }
  progress::-webkit-progress-bar {
    background: $mainSecondColor;
  }

  progress::-webkit-progress-value {
    background: $mainColor;
  }

  &__date-wrap {
    display: flex;
    color: $mainFifthColor;
    padding: 10px 0 30px 0;
  }

  &__vievd {
    color: $mainFifthColor;
  }

  &__vievd-wrap {
    position: absolute;
    right: 25px;
    top: 125px;
  }

  &__chart-line {
    display: inline-block;
    border-right: 1px solid $mainFourthColor;
    div {
      padding: 5px 0;
      margin-right: 5px;
    }
  }

  &__container {
    display: flex;
    border-bottom: 1px solid $mainFourthColor;
    position: relative;
  }

  &__period {
    padding-bottom: 30px;
    font-size: 14px;
    color: #9E9E9E;
  }

  &__body {
    display: flex;
  }

  &__description {
    width: 25%;
    padding-left: 30px;
    padding-top: 30px;
  }

  &__container-chart {
    width: 75%;
  }

  &__description_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $mainFifthColor;
    padding-bottom: 13px;
  }

  &__description_key {
    display: flex;
    align-items: center;
  }

  &__description_icon {
    margin-right: 10px;
  }

  /deep/.chartjs-render-monitor {
    width: 100% !important;
  }
}

@media (max-width: $break-sm) {
  .chart {
    &__container-chart {
      width: 100%;
    }

    &__description {
      position: absolute;
      width: 40%;
      padding: 0;
      right: 0;
      top: -30px;
    }

    &__body {
      position: relative;
    }

    &__period {
      padding-bottom: 45px;
    }
  }
}
</style>

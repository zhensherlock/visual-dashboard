let canvasObjectData = {
  type: 'canvas'
}
export const state = {
  objectDataList: [canvasObjectData],
  currentObjectData: canvasObjectData
}

export const mutations = {
  addObjectData (state, { objectData }) {
    state.objectDataList.push(objectData)
  },
  setCurrentObjectData (state, { objectData }) {
    state.currentObjectData = objectData
  },
  setChartType (state, { objectData, chartType }) {
    objectData.chartOptions.chartType = chartType
  },
  updateChartData (state, { changes }) {
    state.currentObjectData.rawData.data[changes[0][0]][changes[0][1]] = changes[0][3]
  },
  setCurrentChartRawData (state, { rawData }) {
    state.currentObjectData.rawData = rawData
  },
  setCurrentChartOptions (state, { chartOptions }) {
    state.currentObjectData.chartOptions = chartOptions
  }
}

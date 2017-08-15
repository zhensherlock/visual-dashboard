class DataHandle {
  constructor (params) {
    let self = this
    self.data = params.data
  }
  dataTrans () {
    let self = this
    let dimensionData, measureData

    dimensionData = self.data.map((item) => {
      return item[0]
    })
    measureData = self.data.map((item) => {
      return item[1]
    })

    return {
      dimensionData: dimensionData,
      measureData: measureData
    }
  }
}

export default DataHandle

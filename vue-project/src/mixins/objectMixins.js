var mixin = {
  methods: {
    selectObject (event) {
      let target = event.target
      console.log(target)
      this.$emit('selectObject')
    }
  }
}

export default mixin

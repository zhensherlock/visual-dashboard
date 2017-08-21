var mixin = {
  methods: {
    selectObj (e) {
      let target = e.target
      console.log(target)
      this.$emit('selectObj')
    }
  }
}

export default mixin

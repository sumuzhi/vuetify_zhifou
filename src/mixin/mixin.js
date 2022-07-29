export const formatNumber = {
  computed: {
    formatterNumber() {
      return function (number) {
        if (number >= 100000000) {
          return (number / 100000000).toFixed(2) + '亿'
        } else if (number >= 10000) {
          return (number / 10000).toFixed(2) + '万'
        } else {
          return number
        }
      }
    },
  },
  methods: {
    labelColor(label) {
      if (label === 'VIP') {
        return 'warning'
      } else if (label === '首播') {
        return 'error'
      } else {
        return 'success'
      }
    },
  },
}

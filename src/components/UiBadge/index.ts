import UiBadge from './UiBadge.vue'

// @ts-ignore
UiBadge.install = function (Vue: any) {
  Vue.component(UiBadge.name, UiBadge)
}

export default UiBadge
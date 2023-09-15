import UiBtn from './UiBtn.vue'

// @ts-ignore
UiBtn.install = function (Vue: any) {
  Vue.component(UiBtn.name, UiBtn)
}

export default UiBtn
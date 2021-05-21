import BackTop from 'components/content/backTop/BackTop'

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false, // 返回顶部按钮的显示与隐藏
        }
    },
    methods: {
        // 返回按钮返回顶部
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        },
    },
}
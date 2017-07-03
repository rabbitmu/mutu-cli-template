import scrollEnd from '../utils/scrollEnd'

const itemHeight = 80 // 单个选择元素的高度

export default {
    name: 'SelectorOptions',
    props: {
        /**
         * 渲染的选项列表
         */
        options: {
            type: Array,
            required: true
        },
        /**
         * render所需的数据的key
         */
        renderKey: {
            type: String,
            default: 'name'
        },
        /**
         * 默认打开显示的数据下标
         */
        defaultIndex: {
            type: Number
        }
    },
    data() {
        return {
            canInitPosition: false,
            selectedItemIndex: 0 // 当前选中的元素下标
        }
    },
    watch: {
        options(newValue, oldValue) {
            this.$el.scrollTop = 0           
            this.$emit('select', this.options[0])
        }   
    },
    mounted() {
        if(this.defaultIndex) {
            this.$el.scrollTop = this.defaultIndex * itemHeight
            this.selectedItemIndex = this.defaultIndex
        }
        // this.canInitPosition = true

        // 绑定滚动结束事件
        scrollEnd(this.$el, () => this.getScrollItem(itemHeight), true)
    },
    methods: {
        /**
         * 根据子元素高度设置滚动项高度，保证总有一项处于正中状态，默认高度40
         */
        getScrollItem(itemHeight) {
            // 将某项元素滚动到容器正中
            const scrollTop = this.$el.scrollTop
            const remainder = scrollTop % itemHeight
            const halfHeight = itemHeight / 2

            let tempTop = 0
            let tempIndex = (scrollTop - remainder) / itemHeight
            if(remainder < halfHeight) {
                tempTop = scrollTop - remainder
            } else {
                tempTop = scrollTop + itemHeight - remainder
                tempIndex++
            }

            this.$el.scrollTop = tempTop
            this.selectedItemIndex = tempIndex
            this.$emit('select', this.options[tempIndex])
        }
    },
    render() {
        const { options, renderKey, selectedItemIndex } = this

        let itemsArr = []
        options.map((item, index) => {
            itemsArr.push(
                <div class="selector-options-item"
                    { ...{ class: { 'selected': index === this.selectedItemIndex } } }>
                    { item[renderKey] }
                </div>
            )
        })

        return (
            <section class="selector-options">
                { itemsArr }
            </section>
        )
    }
}

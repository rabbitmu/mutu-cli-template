/**
 * 可滚动的容器，max-height=100%
 */
export default {
    name: 'Scroller',
    functional: true,
    render() {
        const context = arguments[1]
        const style = {
            overflowY: 'scroll',
            height: '100%'
        }
        return (
            <div
                style={ style }
                class="scroller">{ context.children }</div>
        )
    }
}

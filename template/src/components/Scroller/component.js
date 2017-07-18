/**
 * 可滚动的容器，max-height=100%
 */
import style from './style.scss'

export default {
    name: 'Scroller',
    functional: true,
    render(...rest) {
        const context = rest[1]
        return (
            <section class={ style.container }>{ context.children }</section>
        )
    }
}

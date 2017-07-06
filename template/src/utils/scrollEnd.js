import throttle from './throttle'

export default function(dom, callback) {
    dom.addEventListener('scroll', throttle({
        action() {
            callback && callback()
        }
    }))
}

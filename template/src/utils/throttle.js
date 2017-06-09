export default function({ action, interval }) {
    let timer

    return function() {
        clearTimeout(timer)
        timer = setTimeout(() => {
            action && action()
        }, interval || 50)
    }
}

export default function({ action, interval }) {
    let timer

    return function() {
        clearTimeout(timer)
        timer = setTimeout(() => {
            console.log(timer)
            action()
        }, interval || 50)
    }
}

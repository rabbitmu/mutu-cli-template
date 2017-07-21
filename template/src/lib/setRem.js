(function(doc, win) {
    var ratio = window.devicePixelRatio || 1

    var scale = Math.round(1 / ratio * 100) / 100
    var metaEl = document.createElement('meta')

    metaEl.setAttribute('name', 'viewport')
    metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
    // document.getElementsByTagName('head')[0].appendChild(metaEl)

    var docEl = doc.documentElement
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    var recalc = function() {
        var clientWidth = docEl.clientWidth
        if (!clientWidth) return

        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
        doc.body.addEventListener('touchstart', function() {})
    }

    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
})(window.document, window)


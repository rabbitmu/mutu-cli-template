export default function() {
    let query = {}
    
    const searchString = location.search.slice(1) || location.hash.slice(location.hash.indexOf('?'))

    const reg = /&?(\w+)=([^&]+)(?:$|&)/igm

    while(reg.test(searchString)) {
        query[RegExp.$1] = decodeURIComponent(RegExp.$2)
    }

    return query
}

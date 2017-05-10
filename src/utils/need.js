/** @module utils/require */

/**
 * 按需加载外链js资源
 */
export default (resource, done) => {
	const node = document.createElement('script')
	node.async = false
	node.src = resource

	const supportOnload = 'onload' in node
	if (supportOnload) {
		node.onload = done
		node.onerror = () => {
			console.error(`${resource}加载失败`, node)
		}
	} else {
		node.onreadystatechange = () => {
			if (/loaded|complete/i.test(node.readyState)) {
				done.call(node)
			}
		}
	}

	document.getElementsByTagName('head')[0].appendChild(node)
}

/**
 * 封装axios请求方法
 * @example
 * import axios from 'path/to/request';
 * axios({ url: '', data: { token: '' } });
 */
import axios from 'axios';

// 设置请求根路径
axios.defaults.baseURL = '';

function request({ url, method = 'get', data = {} }) {
	let options = { url, method };

	// 区分请求方式
	if(method === 'get') {
		let query = '';
		Object.entries(data).map(item => {
			const sign = query ? '&' : '?';
			query += `${sign}${item[0]}=${item[1]}`;
		});
		options.url += query;
	} else {
		options = { ...options, data };
	}

	return axios(options);
};

export default {
	install(Vue) {
		Vue.request = request;
		Vue.prototype.$request = request;
	}
};

/**
 * 封装axios请求方法
 * @example
 * import axios from 'path/to/request';
 * axios({ url: '', data: { token: '' } });
 */
import axios from 'axios';
import { HTTP_RESULT } from 'constants/HTTP';

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

	return axios(options).then(res => {
			const { data } = res;
			if(data.code === HTTP_RESULT.SUCCESS) {
				return data;
			} else {
				return Promise.reject(data.msg);
			}
		});
};

export default {
	install(Vue) {
		Vue.request = request;
		Vue.prototype.$request = request;
	}
};

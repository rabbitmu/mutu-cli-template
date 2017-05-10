/**
 * requestProxy.js
 * 封装fetch操作对象
 */

import fetch from 'isomorphic-fetch'

function showData(data, url) {
	console.log('>>>>> 响应数据 <<<<<')
	console.log(JSON.stringify(data))
	console.log(`请求地址:${url}`)
}

export default {
	post: async function(url, body, params) {
		//定义URL
		let URL = url
		//如果有get参数，拼接参数
		if (params){

			if (url.indexOf('?') === -1){
				//不存在GET参数时
				let str = ''
				for (let name in params) {
					str += `${name}=${params[name]}&`
				}
				str = str.substring(0, str.length-1)

				URL = `${url}?${str}`
			} else {
				//存在GET参数时
				let str = ''
				for (let name in params) {
					str += `&${name}=${params[name]}`
				}

				URL = `${url}${str}`
			}
		}

		if (global.DEBUG) {
			console.log('>>>>> POST 请求数据 <<<<<')
			console.log(JSON.stringify(body))
			console.log(`请求地址:${URL}`)
		}

		let response = await fetch(URL, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})

		return await response.json().then((data) => {

			if (global.DEBUG) {
				//showData(data, URL)
				data.request = JSON.stringify(body)
				data.response = JSON.stringify(data)
			}

			return data
		})
	},
	get: async function(url) {
		if (global.DEBUG) {
			console.log('>>>>> GET 请求数据 <<<<<')
			console.log(`请求地址:${url}`)
		}

		let response = await fetch(url)

		return await response.json().then((data) => {
			if (global.DEBUG) {
				// showData(data, url)
				data.request = JSON.stringify(body)
				data.response = JSON.stringify(data)
			}

			return data
		})
	}
}

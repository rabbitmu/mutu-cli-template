
/**
 * 拼装请求基础城/区/校参数，未合并mutations
 * @param {String} view 视图参数
 * @param {String} part 页面模块
 * @param {String} data 请求数据源
 */
const setOptions = function(view, part, data) {
	const { selector, authentication } = this;

	// 区分不同视图
	let viewObject = {};
	let url = '';
	switch(view) {
		case 'city':
			viewObject = {
				cityId: selector.city.item_id,
				cityName: selector.city.name,
				provinceId: selector.province.item_id,
				provinceName: selector.province.name
			};
		break;
		case 'county':
			viewObject = {
				countyId: selector.county.enum,
				countyName: selector.county.name,
				cityId: selector.city.item_id,
				cityName: selector.city.name
			};
		break;
		case 'school':
			viewObject = {
				schoolId: selector.school.enum,
				schoolName: selector.school.name,
				countyId: selector.county.enum,
				countyName: selector.county.name
			};
		break;
	}
	url = `/api/${part}/${data}/${view}`;

	const options = {
		url,
		body: Object.assign({}, viewObject, {
			startDate: selector.startDate,
			endDate: selector.endDate,
			grades: selector.grade,
			subjects: selector.subject.enum ? [selector.subject.enum] : [],
			params: {
				token: authentication.user.token,
				custom_type: authentication.user.custom_type
			}
		})
	};

	return options;
}

export default setOptions;

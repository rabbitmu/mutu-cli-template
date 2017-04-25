import component from 'components/Toast';

const ToastConstructor = Vue.extend(component);
let canToast = true; // 控制点击次数

const getInstance = () => {
	return new ToastConstructor({
		el: document.createElement('div')
	});
};

const removeDom = event => {
	if(event.target.parentNode) {
		event.target.parentNode.removeChild(event.target);
	}
}

ToastConstructor.prototype.close = function() {
	this.visible = false;
	this.$el.addEventListener('transitionend', removeDom);
};

function Toast(options = '') {
	// 控制点击次数
	if(!canToast) return;
	canToast = false;

	const instance = getInstance();
	instance.message = typeof options === 'string' ? options : options.message;

	document.body.appendChild(instance.$el);
	setTimeout(() => {
		instance.$el.removeEventListener('transitionend', removeDom);
		instance.visible = true;

		clearTimeout(timer);
		let timer = setTimeout(() => {
			instance.close();
			canToast = true;
		}, 2000);
	}, 0);
};

export default {
	install(Vue) {
		Vue.toast = Toast;
		Vue.prototype.$toast = Toast;
	}
};

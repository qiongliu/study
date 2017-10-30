class Nav {
	constructor (opts) {
		this.opts = opts || {};
		this.nav = document.getElementById('nav');
		this.navItems = this.nav.getElementsByTagName('a');
		this.init();
	}

	init () {
		Object.keys(this.opts).forEach((item) => {
			let dom = this.createDom(this.opts[item])
			this.appendDom(item,dom);
			this.addEvent();
		})
	}

	createDom (val) {
		let dom = document.createElement('div');
		val.forEach((item) => {
			let element = document.createElement('div');
			let textNode = document.createTextNode(item);
			element.style.cssText = ";color: #000;font-size: 16px";
			element.appendChild(textNode);
			dom.appendChild(element);
		})
		dom.className = 'sub-nav';
		dom.style.cssText = ";position: absolute;background-color:#000;width: 100%;display:none;"
		return dom;
	}

	appendDom (eleName,dom) {
		let items = this.navItems;
		for (let i = 0, len = items.length; i < len; i++) {
			if (items[i].innerHTML === eleName) {
				items[i].nextSibling
				items[i].parentElement.appendChild(dom);
			}
		}
	}

	addEvent () {
		for ( let i = 0, len = this.navItems.length; i < len; i++) {
			this.navItems[i].onmouseenter = function () {
				this.nextSibling.style = ';display:block;'
			}
			this.navItems[i].onmouseleave = function () {
				this.nextSibling.style = ';display:none;'
			}
		}
	}
}
new Nav({
	html: ['a','b','c'],
	css: ['a','b','c','d','e'],
	javascript: ['a'],
	nodejs: ['a','b','c']
});
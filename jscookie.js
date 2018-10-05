var JSCookie = new (function()
{
	this.cookieName = "jscookie";
	this.cookieLength = 7 * 24 * 60 * 60 * 1000;
	this.cookieObject = {};
	
	this.get_from_cookie = function(elem)
	{
		if(this.cookieObject[elem.dataset.cookie] != null)
		{
			if(elem.type == "select-multiple" && Array.isArray(this.cookieObject[elem.dataset.cookie]))
			{
				for(var i=0; i < elem.options.length; i++)
					if(this.cookieObject[elem.dataset.cookie].indexOf(elem.options[i].value) > -1)
						elem.options[i].selected = true;
					else
						elem.options[i].selected = false;
			}
			else if(elem.type == "checkbox")
			{
				if(this.cookieObject[elem.dataset.cookie])
					elem.checked = true;
				else
					elem.checked = false;
			}
			else if(elem.type == "radio")
			{
				if(this.cookieObject[elem.dataset.cookie] == elem.value)
					elem.checked = true;
			}
			else
				elem.value = this.cookieObject[elem.dataset.cookie];
		}
	};
	
	this.input_changed = function(changeEvent)
	{
		if(changeEvent.target.type == "select-multiple")
		{
			var val = [];
			for(var i=0; i < changeEvent.target.options.length; i++)
				if(changeEvent.target.options[i].selected)
					val.push(changeEvent.target.options[i].value);
			this.save_data(changeEvent.target.dataset.cookie, val);
		}
		else if(changeEvent.target.type == "checkbox")
			this.save_data(changeEvent.target.dataset.cookie, changeEvent.target.checked);
		else if(changeEvent.target.type == "radio")
		{
			if(changeEvent.target.checked)
				this.save_data(changeEvent.target.dataset.cookie, changeEvent.target.value);
		}
		else
			this.save_data(changeEvent.target.dataset.cookie, changeEvent.target.value);
	};

	this.save_data = function(key, val)
	{
		if(typeof(key) == "object")
			for(var i in key)
				this.cookieObject[i] = key[i];
		else
			this.cookieObject[key] = val;
		this.setCookie(this.cookieName, JSON.stringify(this.cookieObject));
	};

	this.setCookie = function(cname, cvalue)
	{
		var d = new Date();
		d.setTime(d.getTime() + this.cookieLength);
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	};

	this.getCookie = function(cname)
	{
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++)
		{
			var c = ca[i];
			while (c.charAt(0) == ' ')
			{
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0)
			{
				return c.substring(name.length, c.length);
			}
		}
		return "";
	};
	
	this.initialize = function(loadEvent)
	{
		if(document.body.dataset.cookieName != null)
			this.cookieName = document.body.dataset.cookieName;
		
		if(document.body.dataset.cookieDays != null && !isNaN(temp = parseInt(document.body.dataset.cookieDays)))
			this.cookieLength = temp * 86400000;
		
		var cookie_raw = this.getCookie(this.cookieName);
		if(cookie_raw != "")
		{
			this.cookieObject = JSON.parse(cookie_raw);
			if(this.cookieObject == null)
				this.cookieObject = {};
		}
		var cookie_elements = document.querySelectorAll("[data-cookie]");
		cookie_elements.forEach(function(elem, i, list){
			this.get_from_cookie(elem);
			elem.addEventListener("change", this.input_changed.bind(this));
		}.bind(this));
	};
})();
document.addEventListener("DOMContentLoaded", JSCookie.initialize.bind(JSCookie));
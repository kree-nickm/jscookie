document.addEventListener("DOMContentLoaded", function(loadEvent){
	// Declare functions.
	var get_from_cookie = function(elem, i, list)
	{
		if(prefs[elem.dataset.cookie] != null)
		{
			console.dir(elem);
			if(elem.type == "select-multiple" && Array.isArray(prefs[elem.dataset.cookie]))
			{
				for(var i=0; i < elem.options.length; i++)
					if(prefs[elem.dataset.cookie].indexOf(elem.options[i].value) > -1)
						elem.options[i].selected = true;
					else
						elem.options[i].selected = false;
			}
			else if(elem.type == "checkbox")
			{
				if(prefs[elem.dataset.cookie])
					elem.checked = true;
				else
					elem.checked = false;
			}
			else if(elem.type == "radio")
			{
				if(prefs[elem.dataset.cookie] == elem.value)
					elem.checked = true;
			}
			else
				elem.value = prefs[elem.dataset.cookie];
		}
		elem.addEventListener("change", input_changed);
	}
	
	var input_changed = function(changeEvent)
	{
		if(this.type == "select-multiple")
		{
			var val = [];
			for(var i=0; i < this.options.length; i++)
				if(this.options[i].selected)
					val.push(this.options[i].value);
			save_data(this.dataset.cookie, val);
		}
		else if(this.type == "checkbox")
			save_data(this.dataset.cookie, this.checked);
		else if(this.type == "radio")
		{
			if(this.checked)
				save_data(this.dataset.cookie, this.value);
		}
		else
			save_data(this.dataset.cookie, this.value);
	}

	var save_data = function(key, val)
	{
		if(typeof(key) == "object")
			for(var i in key)
				prefs[i] = key[i];
		else
			prefs[key] = val;
		setCookie(cookieName, JSON.stringify(prefs));
	}

	var setCookie = function(cname, cvalue)
	{
		var d = new Date();
		d.setTime(d.getTime() + cookieLength);
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	var getCookie = function(cname)
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
	}
	
	// Initiate.
	var cookieName = "jscookie";
	if(document.body.dataset.cookieName != null)
		cookieName = document.body.dataset.cookieName;
	
	var cookieLength = 365 * 24 * 60 * 60 * 1000;
	if(document.body.dataset.cookieDays != null && !isNaN(temp = parseInt(document.body.dataset.cookieDays)))
		cookieLength = temp * 86400000;
	
	var prefs = {};
	var cookie_raw = getCookie(cookieName);
	if(cookie_raw != "")
	{
		prefs = JSON.parse(cookie_raw);
		if(prefs == null)
			prefs = {};
	}
	else
	{
		prefs = {};
	}
	var cookie_elements = document.querySelectorAll("[data-cookie]");
	cookie_elements.forEach(get_from_cookie);
});
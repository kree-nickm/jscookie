document.addEventListener("DOMContentLoaded", function(loadEvent){
	// Declare functions.
	var process_input = function(elem, i, list)
	{
		if(prefs[elem.dataset.cookie] != null)
		{
			if(false)
			{
			}
			else
				elem.value = prefs[elem.dataset.cookie];
		}
		elem.addEventListener("change", input_changed);
	}
	
	var input_changed = function(changeEvent)
	{
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
	cookie_elements.forEach(process_input);
});
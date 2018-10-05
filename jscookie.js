document.addEventListener("DOMContentLoaded", function(loadEvent){
	// Declare functions.
	var process_input = function(elem, i, list)
	{
		if(prefs[document.location.pathname][elem.dataset.cookie] != null)
		{
			if(false)
			{
			}
			else
				elem.value = prefs[document.location.pathname][elem.dataset.cookie];
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
				prefs[document.location.pathname][i] = key[i];
		else
			prefs[document.location.pathname][key] = val;
		setCookie("jscookie", JSON.stringify(prefs), 365);
	}

	var setCookie = function(cname, cvalue, exdays)
	{
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
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
	var prefs = {};
	var cookie_raw = getCookie("jscookie");
	if(cookie_raw != "")
	{
		prefs = JSON.parse(cookie_raw);
		if(prefs[document.location.pathname] == null)
			prefs[document.location.pathname] = {};
	}
	else
	{
		prefs = {};
		prefs[document.location.pathname] = {};
	}
	var cookie_elements = document.querySelectorAll("[data-cookie]");
	cookie_elements.forEach(process_input);
});
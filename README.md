# jscookie
This is just something I was working on for fun. You should probably go here instead if you want a usable script: https://github.com/js-cookie/js-cookie

## Usage
Include the following anywhere in your HTML document:
```html
<script src="https://kree-nickm.github.io/jscookie/jscookie.js"></script>
```
Define a `data-cookie` attribute to any input, and that input will be saved to a cookie every time it is changed. When the user reloads the page, that element will have its value loaded from the cookie.

To choose the actual cookie name where user data is stored, use a `data-cookie-name` attribute in the `<body>` tag. The default is "jscookie".

To choose the expiration of the cookie, use a `data-cookie-days` attribute in the `<body>` tag to set the number of days until the cookie expires. The default is "365" or one year.

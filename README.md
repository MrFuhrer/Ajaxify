#Ajaxify
Javascript library to ajaxify forms (Send form requests as ajax)

#Installation
This library can be used with jquery or with pure javascript, anyway you just have to copy ajaxify.js or minified javascript file in your project
```html
<script type="text/javascript" src="/path/to/ajaxify.js"></script>
```
or 
```html
<script type="text/javascript" src="/path/to/ajaxify.min.js"></script>
```

#Usage example
html
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Ajaxify example</title>
	<script type='text/javascript' src='js/ajaxify.js'></script>
</head>
<body>
<form action="/someaction" method="post" id="login-form">
	<input type="text" name="username" placeholder="Username">
	<input type="password" name="password" placeholder="Password">
</form>
</body>
</html>
```
Javascript
```javascript
// ajaxify uses html form action and method
ajaxify(document.getElementById('login-form'), {
	callback: function(data,statusCode) {
		// some code after form has been submitted
		// variable data is json or any text returned from server script
		// variable statusCode is status code returned from server
	},
	validation: function(form) {
		// validation must return boolean (true if form can be submited, false if form can not be submitted)
		if(form.username.length<3) {
			alert('Username must be more than 3 characters');
			return false;
		}
		return true;
	}
});
```

javascript using jquery
```javascript
$('#login-form').ajaxify(function(data,statusCode) {
		// some code after form has been submitted
		// variable data is json or any text returned from server script
		// variable statusCode is status code returned from server
}, function(form){
	// validation must return boolean (true if form can be submited, false if form can not be submitted)
});
```

#Notes
* note that ajaxify works with multipart/form-data enctype and file uploads too

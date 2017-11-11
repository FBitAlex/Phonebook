<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Phonebook</title>
	<link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
	<div id="app" class="container">
		<page-header></page-header>
		<div class="container">
			<router-view></router-view>
		</div>
		<page-footer></page-footer>
	</div>
	<script src="{{ asset('js/app.js')}}"></script>
</body>
</html>

<script>
	
</script>
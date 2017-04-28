<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Expense Tracker</title>
<meta name="description" content="">
<meta name="author" content="">

<!-- Favicons
    ================================================== -->
<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
<link rel="apple-touch-icon" href="img/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="72x72"
	href="img/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="114x114"
	href="img/apple-touch-icon-114x114.png">

<!-- Bootstrap -->
<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
<link rel="stylesheet" type="text/css"
	href="fonts/font-awesome/css/font-awesome.css">

<!-- Stylesheet
    ================================================== -->
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="stylesheet" type="text/css"
	href="css/nivo-lightbox/nivo-lightbox.css">
<link rel="stylesheet" type="text/css"
	href="css/nivo-lightbox/default.css">
<link
	href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700"
	rel="stylesheet">
<link
	href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
	rel="stylesheet">
<link
	href="https://fonts.googleapis.com/css?family=Dancing+Script:400,700"
	rel="stylesheet">

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
	<!-- Navigation
    ==========================================-->
	<nav id="menu" class="navbar navbar-default navbar-fixed-top">
		<div class="container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand page-scroll" href="#page-top">Expense
					Tracker</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse"
				id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
					<li id = "login-li"><a href="#login" class="page-scroll">Login</a></li>
					<li style = "display:none" id= "user-li"><a href="#view-expenses" class="page-scroll"></a></li>
					<li style = "display:none" id= "view-expenses-li"><a href="#view-expenses" class="page-scroll">Expenses</a></li>
					<li style = "display:none" id = "create-li"><a href="#create" class="page-scroll">Create</a></li>
					<li style = "display:none" id = "report-li"><a href="#report" class="page-scroll">Report</a></li>
					<li style = "display:none" id = "logout-li"><a href="#">Logout</a></li>
				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
	</nav>
	<!-- Header -->
	<header id="header">
		<div class="intro">
			<div class="overlay">
				<div class="container">
					<div class="row">
						<div class="intro-text">
							<h1>Expense Tracker</h1>
							<p>Track your every expense</p>
							<a href="#login" class="btn btn-custom btn-lg page-scroll">Login</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
	<!-- Login Section -->
	<div id="login">
		<div class="container" id="login-container">
			<div class="section-title text-center">
				<h2>Login</h2>
				<hr>
				<p>Enter user details</p>
			</div>
			<div class="col-md-10 col-md-offset-1">
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<input type="email" id="email" name="email" class="form-control"
								placeholder="Email" required="required">
							<p class="help-block text-danger"></p>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<input type="password" id="password" name="password"
								class="form-control" placeholder="Password" required="required">
							<p class="help-block text-danger"></p>
						</div>
					</div>
					<input type="button" class="btn btn-custom btn-lg" id="loginButton"
						style="margin-left: 425px;" value="Login">
				</div>
			</div>
		</div>
	</div>
	<!-- View Expenses Section -->
	<div id="view-expenses" hidden = "">
		<div class="section-title text-center center">
			<div class="overlay">
				<h2>Expenses</h2>
				<hr>
				<div class="row">
					<div class="categories">
						<ul class="cat">
							<li>
								<ol class="type">
									<li><a href="#" id="viewExpensesButton">View</a></li>
								</ol>
							</li>
						</ul>
						<div class="clearfix"></div>
					</div>
				</div>
				
			</div>
		</div>
		<div class="container">
			<section class="content">
				<div class="row">
					<div class="col-xs-12">

						<div class="box">
							<div class="box-header">
								<h3 class="box-title">--</h3>
							</div>
							<!-- /.box-header -->
							<div class="box-body">
								<table id="viewExpensesTable" class="table table-bordered table-striped">
									<thead>
										<tr>
											<th>Date</th>
											<th>Amount</th>
											<th>Description</th>
											<th>Update/Delete</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
									</tbody>
									<tfoot>
										<tr>
											<th>Date</th>
											<th>Amount</th>
											<th>Description</th>
											<th>Update/Delete</th>
										</tr>
									</tfoot>
								</table>
							</div>
							<!-- /.box-body -->
						</div>
						<!-- /.box -->
					</div>
					<!-- /.col -->
									<div class="row">
					<div class="categories">
						<ul class="cat">
							<li>
								<ol class="type">
									<li><a href="#" id="updateButton">Edit</a></li>
									<li><a href="#" id="deleteButton">Delete</a></li>
								</ol>
							</li>
						</ul>
						<div class="clearfix"></div>
					</div>
				</div>
					
				</div>
				<!-- /.row -->
			</section>
			<!-- /.content -->

		</div>
	</div>
	<!-- create Section -->
	<div id="create" hidden="">
		<div class="section-title text-center center">
			<div class="overlay">
				<h2>Create Expenses</h2>
				<hr>
			</div>
		</div>
		<div class="container">
			<section class="content">
				<div class="row">
					<div class="col-xs-12">
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<input type="datetime-local" id="dateTime" class="form-control"
										placeholder="Date Time" required="required">
									<p class="help-block text-danger"></p>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<input type="number" id="amount" class="form-control"
										placeholder="Amount" required="required">
									<p class="help-block text-danger"></p>
								</div>
							</div>
						</div>
						<div class="form-group">
							<textarea name="description" id="description"
								class="form-control" rows="4" placeholder="Description" required></textarea>
							<p class="help-block text-danger"></p>
						</div>
						<div id="success"></div>
						<input type="button" class="btn btn-custom btn-lg" id= "createButton" value = "Create">

					</div>
					<!-- /.col -->
				</div>
				<!-- /.row -->
			</section>
			<!-- /.content -->

		</div>
	</div>

	<!-- report Section -->
	<div id="report" hidden = "">
		<div class="section-title text-center center">
			<div class="overlay">
				<h2>Report</h2>
				<hr>
				<div class="row">
					<div class="categories">
						<ul class="cat">
							<li>
								<ol class="type">
									<li><a href="#" id="weeklyButton">Weekly</a></li>
									<li><a href="#" id="customButton">Custom</a></li>
								</ol>
							</li>
						</ul>
						<div class="clearfix"></div>
					</div>
				</div>

			</div>
		</div>
		<div class="container">
			<div class="col-md-10 col-md-offset-1" id="customDate" hidden="">
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							Start : <input type="datetime-local" id="startDateTime"
								class="form-control" required="required">
							<p class="help-block text-danger"></p>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							End : <input type="datetime-local" id="endDateTime"
								class="form-control" required="required">
							<p class="help-block text-danger"></p>
						</div>
					</div>
					<input type="button" class="btn btn-custom btn-lg" id="viewCustomButton"
						style="margin-left: 425px;" value="View">
				</div>
			</div>
			<div class="col-md-10 col-md-offset-1" id="weeklyDate">
				<div class="row">
					<div class="categories">
						<ul class="cat">
							<li>
								<ol class="type">
									<li><a href="#" id="prevWeekButton">Previous</a></li>
									<li><a href="#" id="nextWeekButton">Next</a></li>
								</ol>
							</li>
						</ul>
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
			
			<section class="content">
				<div class="row">
					<div class="col-xs-12">

						<div class="box">
							<div class="box-header">
								<h3 class="box-title">--</h3>
							</div>
							<!-- /.box-header -->
							<div class="box-body">
								<table id="viewReport" class="table table-bordered table-striped">
									<thead>
										<tr>
											<th>Date</th>
											<th>Amount</th>
											<th>Description</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td></td>
											<td></td>
											<td></td>
										</tr>
									</tbody>
									<tfoot>
										<tr>
											<th>Date</th>
											<th>Amount</th>
											<th>Description</th>
										</tr>
									</tfoot>
								</table>
							</div>
							<!-- /.box-body -->
						</div>
						<!-- /.box -->
					</div>
					<!-- /.col -->
				</div>
				<!-- /.row -->
			</section>
			<!-- /.content -->

		</div>
	</div>
	<div id="footer">
		<div class="container text-center">
			<div class="container-fluid text-center copyrights">
				<div class="col-md-8 col-md-offset-2">
					<div class="social">
						<ul>
							<li><a href="#"><i class="fa fa-facebook"></i></a></li>
							<li><a href="#"><i class="fa fa-twitter"></i></a></li>
							<li><a href="#"><i class="fa fa-google-plus"></i></a></li>
						</ul>
					</div>
					<p>&copy; 2016 AnkurShrivastava. All rights reserved.</p>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="js/jquery.1.11.1.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
		<script type="text/javascript" src="js/SmoothScroll.js"></script>
		<script type="text/javascript" src="js/nivo-lightbox.js"></script>
		<script type="text/javascript" src="js/jquery.isotope.js"></script>
		<script type="text/javascript" src="js/jqBootstrapValidation.js"></script>
		<script type="text/javascript" src="js/contact_me.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
		<script type="text/javascript" src="js/ex-track.js"></script>
		
</body>
</html>

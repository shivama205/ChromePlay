document.addEventListener("DOMContentLoaded", function() { initialise(); }, false);
var username;
var password;
var submitButton;
var spinner;
var ajaxData;
function initialise(){
	username = document.getElementById("inputEmail");
	password = document.getElementById("inputPassword");
	submitButton = document.getElementById("submitButton");
	spinner = document.getElementById("spinner");
	spinner.style.display="none";
	submitButton.addEventListener("click",ajaxHandler,false);
}
function ajaxHandler() {
	submitButton.disabled=true;
	spinner.style.display="block";
	var usr = username.value;
	var pswd = password.value;
	ajaxCall('http://siddartj.desktop.amazon.com:8081/login',{
		"username":usr,
		"password":pswd
	}, function(data, status) {
		console.log(data);
		console.log(status);
		if(data.status==200){
			document.cookie = "AmazonID="+data.data.userID;
			pageRedirect();
		}
	});
	username.value="";
	password.value="";
	spinner.style.display="none";
	submitButton.disabled=false;
}
function ajaxCall(url,data,callback){
	$.post(url,data,callback);
}
function pageRedirect(){
	window.location.href="mediaplayer2.html";
}



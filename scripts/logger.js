var fs = require('fs');
var showdown  = require('showdown');
var converter = new showdown.Converter();

var p = 'EXAMPLE.md';

function updateDiv(data) {
	document.getElementById("display").innerHTML = converter.makeHtml(data);
}

function addLog(type, person, entry) {
	data = "\n__" + type + "__ (" + person + ") - " + entry + "\n";
	document.getElementById("textbox").value += data;
	updateDiv(document.getElementById("textbox").value);
}

function appendLog(e) {
	if(e.keyCode === 13) {
	  e.preventDefault();
	  var type = document.getElementById("type").value, 
	      person = document.getElementById("person").value,
	      entry = document.getElementById("entry").value;

	  addLog(type, person, entry);
	}
}

function openFile(path) {
	fs.readFile(path, 'utf8', function (err, data) {
	  if (err) return console.log(err);
	  document.getElementById("textbox").value = data;
	  updateDiv(data);
	});
}

openFile(p); // Open EXAMPLE.md by default
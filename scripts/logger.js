var fs = require('fs');
var showdown  = require('showdown');
var converter = new showdown.Converter();
var moment = require('moment');

var p = 'EXAMPLE.md';

const { dialog } = require('electron').remote;

function watchOpenedFile(path) {
	fs.watch(path, {encoding: 'utf8'}, (event, filename) => {
		if (event == 'change')
			alert(filename + ' has been changed in the background. Consider refreshing!');
	});
}

function openFileDialog() {
	dialog.showOpenDialog({ properties: ['openFile'] }, (filePaths, bookmarks) => {
		if (filePaths.length > 0) {
			p = filePaths[0];
			openFile(p);
			watchOpenedFile(p);
		}
	});
}

function saveFile() {
	const data = new Uint8Array(Buffer.from(document.getElementById("textbox").value));
	fs.writeFile(p, data, (err) => {
	  if (err) throw err;
	  console.log('The file has been saved!');
	  alert('The file has been saved!');
	});
}

function updateDiv(data) {
	document.getElementById("display").innerHTML = converter.makeHtml(data);
}

function addLog(type, person, entry) {
	let date = moment().utc().format('Do MMMM YYYY, h:mm A');
	let data = "\n__" + type + "__ (" + person + ") _" + date + "_ - " + entry + "\n";
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
const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'dbprodutos'
});

mysqlConnection.connect((err) => {
	if(err){
		console.log('DB connection failed. \n Error: ' + JSON.stringify(err, undefined, 2));
	}else{
		console.log('DB connection succeded.');
	}
});

require('./routes/produtosRoute')(app, mysqlConnection);
require('./routes/categoriasRoute')(app, mysqlConnection);
require('./routes/calculaParcela')(app, mysqlConnection);

app.listen(8077, () => {
	console.log('Express server is running at port: 8077');
});
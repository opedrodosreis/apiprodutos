const mysql = require('mysql');

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
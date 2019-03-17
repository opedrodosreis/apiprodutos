module.exports = function(app, db){

	//Traz uma lista de todas as categorias
	app.get('/categorias', (req, res) => {

		db.query('SELECT * FROM categorias', (err, rows, fields) => {
			if(err){
				console.log(err);
			}else{
				res.send(rows);
			}
		});
	});

	//Pega uma categoria específica pelo id
	app.get('/categorias/:id', (req, res) => {

		db.query('SELECT * FROM categorias WHERE id = ?',[req.params.id], (err, rows, fields) => {
			if(err){
				console.log(err);
			}else{
				res.send(rows);
			}
		});
	});

	//Cadastra uma nova categoria
	app.post('/categorias', (req, res) => {

		let categoria = req.body;
		let sqlQuery = 'INSERT INTO categorias (nome) VALUES (?)';

		db.query(sqlQuery,[categoria.nome], (err, rows, fields) => {
			if(err){
				console.log(err);
			}else{
				res.send(rows);
			}
		});
	});

	//Deleta uma categoria com base em seu id
	app.delete('/categorias/:id', (req, res) => {

		db.query('DELETE FROM categorias WHERE id = ?',[req.params.id], (err, rows, fields) => {
			if(err){
				console.log(err);
			}else{
				res.send('Deletado com sucesso.');
			}
		});
	});
};
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

	//Altera os dados de uma categoria existente
	app.put('/categorias/:id', (req, res) => {

		let categoria = req.body;
		let sqlQuery = 'UPDATE categorias SET nome = ? WHERE id = ?';

		db.query(sqlQuery,[categoria.nome, req.params.id], (err, rows, fields) => {
			if(err){
				console.log(err);
			}else{
				res.send('Atualizado com sucesso.');
			}
		});
	});

	//Deleta uma categoria existente
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
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
		let sqlQuery = 'INSERT INTO categorias (nome, juros_mensais) VALUES (?, ?)';

		db.query(sqlQuery,[categoria.nome, categoria.juros_mensais], (err, rows, fields) => {
			if(err){
				console.log(err);
			}else{
				res.send('Cadastrado com sucesso.');
			}
		});
	});

	//Altera os dados de uma categoria existente
	app.put('/categorias/:id', (req, res) => {

		let categoria = req.body;

		if(categoria.nome != null && categoria.juros_mensais != null){

			let sqlQuery = 'UPDATE categorias SET nome = ?, juros_mensais = ? WHERE id = ?';

			db.query(sqlQuery,[categoria.nome, categoria.juros_mensais,req.params.id], (err, rows, fields) => {
				if(err){
					console.log(err);
				}else{
					res.send('Atualizado com sucesso.');
				}
			});

		} else if(categoria.nome != null && categoria.juros_mensais == null){

			let sqlQuery = 'UPDATE categorias SET nome = ? WHERE id = ?';

			db.query(sqlQuery,[categoria.nome,req.params.id], (err, rows, fields) => {
				if(err){
					console.log(err);
				}else{
					res.send('Atualizado com sucesso.');
				}
			});
			
		} else if(categoria.nome == null && categoria.juros_mensais != null){

			let sqlQuery = 'UPDATE categorias SET juros_mensais = ? WHERE id = ?';

			db.query(sqlQuery,[categoria.juros_mensais,req.params.id], (err, rows, fields) => {
				if(err){
					console.log(err);
				}else{
					res.send('Atualizado com sucesso.');
				}
			});
		}
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
module.exports = function(app, db){

	//Traz uma lista de todos os produtos
	app.get('/produtos', (req, res) => {

		db.query('SELECT * FROM produtos', (err, rows, fields) => {
			if(err){
				console.log(err);
			}else{
				res.send(rows);
			}
		});
	});

	//Pega um produto específico pelo id
	app.get('/produtos/:id', (req, res) => {

		db.query('SELECT * FROM produtos WHERE id = ?',[req.params.id], (err, rows, fields) => {
			if(err){
				console.log(err);
			}else{
				res.send(rows);
			}
		});
	});

	//Cadastra um novo produto
	app.post('/produtos', (req, res) => {

		let produto = req.body;
		let sqlQuery = 'INSERT INTO produtos (nome, descricao, valor, idCategoria) VALUES (?, ?, ?, ?)';

		db.query(sqlQuery,[produto.nome, produto.descricao, produto.valor, produto.idCategoria], (err, rows, fields) => {
			if(err){
				console.log(err);
			}else{
				res.send(rows);
			}
		});
	});

	//Altera os dados de um produto existente
	app.put('/produtos/:id', (req, res) => {

		let produto = req.body;
		let sqlQuery = 'UPDATE produtos SET nome = ?, descricao = ?, valor = ?, idCategoria = ? WHERE id = ?';

		db.query(sqlQuery,[produto.nome, produto.descricao, produto.valor, produto.idCategoria, req.params.id], (err, rows, fields) => {
			if(err){
				console.log(err);
			}else{
				res.send('Atualizado com sucesso.');
			}
		});
	});

	//Deleta um produto existente
	app.delete('/produtos/:id', (req, res) => {

		db.query('DELETE FROM produtos WHERE id = ?',[req.params.id], (err, rows, fields) => {
			if(err){
				console.log(err);
			}else{
				res.send('Deletado com sucesso.');
			}
		});
	});
};
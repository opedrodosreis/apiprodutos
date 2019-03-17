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

	//Deleta um produto com base em seu id
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
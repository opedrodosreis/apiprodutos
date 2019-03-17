module.exports = function(app, db){

	// Calcula o valor das parcelas dado o id do produto e o número de parcelas
	app.get('/produtos/:id/:n', (req, res) => {

		let pv;
		let i;
		let n;
		let valorParcela;

		db.query('SELECT valor FROM produtos WHERE id = ?',[req.params.id], (err, rows, fields) => {
			if(err){
				console.log(err);
			} else{
				setValorProduto(rows[0].valor);
			}
		});

		function setValorProduto(valor){
			pv = valor;

			db.query('SELECT juros_mensais FROM categorias WHERE id = (SELECT idCategoria FROM produtos WHERE id = ?)',[req.params.id], (err, rows, fields) => {
				if(err){
					console.log(err);
				} else{
					setJurosMensais(rows[0].juros_mensais);
				}
			});
		}

		function setJurosMensais(juros_mensais){
			i = juros_mensais / 100;
			setValorParcela();
		}

		function setValorParcela(){
			n = req.params.n;
			valorParcela = pv * i / (1 - Math.pow(1 + i, -n));
			valorParcela = valorParcela.toFixed(2);
			valorParcela = valorParcela.toString();
			res.send(valorParcela);
		}
	});
};
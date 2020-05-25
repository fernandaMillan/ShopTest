const controller = {};

controller.list = (req, res) =>{
    const id = req.params.product;
    
    req.getConnection((err, conn) =>{
        conn.query('Select * from products where id = ?', [id],(err, product) =>{
            if(err){
                res.json(err);
            }
            console.log(product);
            res.render('productPage.html', {
                data:product,
                title: 'Product Page'
            });
        });
    });
};

module.exports = controller;
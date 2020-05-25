const controller = {};


controller.list = (req, res) =>{
    res.render('index.html', {
        title: 'Index Page'
    });

};

controller.save = (req, res) =>{
    const data =req.body;
    console.log(data);
    const data_query = [
        data.name,
        'alimento',
        data.email,
        data.comments, 
        200, 
        1
    ];
    //CALL createProduct(category,productType, productName, description, price, stock);
    console.log(data_query);
    req.getConnection((err, conn) =>{
       var query = conn.query('CALL createProduct(?)', [data_query], (err, contact) =>{
        console.log(query.sql);
            if(err){
                res.json(err);
            }
            res.redirect('/');
            console.log(contact);
            });
        });       
};

module.exports = controller;
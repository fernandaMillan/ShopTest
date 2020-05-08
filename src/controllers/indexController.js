const controller = {};

controller.list = (req, res) =>{
    res.render('index.html', {
        title: 'Index Page'
    });

};

controller.save = (req, res) =>{
    const data =req.body;

    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO contact set ?', [data], (err, contact) =>{
            if(err){
                res.json(err);
            }
            console.log(contact);
            });
        });
};

module.exports = controller;
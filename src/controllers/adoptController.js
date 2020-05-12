const controller = {};

controller.list = (req, res) =>{
    res.render('adopt.html', {
        title: 'Adopt Page'
    });

};

module.exports = controller;
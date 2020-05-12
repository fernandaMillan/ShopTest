const controller = {};

controller.list = (req, res) =>{
    res.render('contact.html', {
        title: 'Contact Page'
    });

};

module.exports = controller;
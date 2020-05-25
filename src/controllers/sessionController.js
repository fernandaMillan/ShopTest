const controller = {};

controller.get_identification = (req, res) =>{
    res.render('identification.html');
};

controller.post_identification = (req, res) =>{
    req.session.name =req.body.name;
    res.redirect('/welcome');
}; 

controller.post_identification = (req, res) =>{
    if(req.session.nombre){
        res.render('/bienvenida', {name: req.session.nombre});
    }else{
    res.redirect('/identification');
    }
}; 

controller.post_identification = (req, res) =>{
    req.session.nombre = null;
    res.redirect('/identification');
}; 

module.exports = controller;
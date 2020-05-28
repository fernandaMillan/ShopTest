var nodemailer = require('nodemailer'); // email sender function 
const controller = {};


controller.sendEmail = (req, res) =>{
    var cart = req.session.cart; 
    var bodyMail= "<strong>Total de Productos comprados:</strong> "+cart.totalItems+ "<br> <strong>Total de la compra: </strong>"+cart.totalPrice+ " pesos.<br> <strong>Productos comprados: </strong>";
    
    for (var id in cart.items){
        bodyMail += "<br>&nbsp; <strong> Producto: </strong>"+cart.items[id]['item'].productName;
        bodyMail += "<br>&nbsp; <strong> Cantidad: </strong>"+cart.items[id].quantity;
        bodyMail += "<br>&nbsp; <strong> Precio: </strong>"+cart.items[id].price+" pesos <br>";
    }
    console.log(bodyMail);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'fer.petshop.mi@gmail.com',
            pass: 'Mexico22'
        }
    });
        var mailOptions = {
        from: 'petshop',
        to: 'mfer.millan@gmail.com',
        subject: 'Compra realizada',
        text: 'Se realizo el pedido de tus productos', 
        html: '<b>Hola! </b><br> Se realizo el pedido de tus productos<br> ' + bodyMail
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
    res.redirect('/cart.html');
};

module.exports = controller;
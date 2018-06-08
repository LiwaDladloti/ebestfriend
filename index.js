var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 9000, () => {
    console.log("app running on port 9000");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/blog', (req, res) => {
    res.render('blog');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact', (req, res) => {
    var subject = req.body.subject;
    var email = req.body.email;
    var message = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'liwadladloti@gmail.com',
            pass: '7784liwa_dladloti'
        }
    });

    const mailOptions = {
    
        from: email, // sender address
        to: ['liwadladloti@gmail.com'], // list of receivers
        subject: subject, // Subject line
        html: `${message} <br/> seneder: ${email}` //message text
      };

      console.log(mailOptions)

      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
        //   document.write('Your message has been set, we will get back to you as soonas we can. Thank you!');
     });
});
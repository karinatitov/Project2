// Dependencies
var path = require("path");


// Routes

module.exports = function (app) {

    app.get('/', checkAuthenticated, (req, res) => {

        res.render('index');
    });

    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.get('/guest', (req, res) => {
        res.render('index');
    })

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }))




    app.get('/register', (req, res) => {
        res.render('register')
    })

    app.post('/register', async (req, res) => {

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            db.User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hashedPassword
            }).then(function (result) {

                // console.log(result)
                res.redirect('/login');

            })



        } catch (err) {
            // console.log(err);
            res.redirect('/register');
        }
    })

    app.delete('/logout', (req, res) => {
        req.logOut()
        res.redirect('/login')
    })

    function checkAuthenticated(req, res, next) {

        if (req.isAuthenticated()) {
            return next()
        }

        res.redirect('/login')
    }

}
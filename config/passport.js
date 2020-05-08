var LocalStategy = require("passport-local").Strategy;

var db = require("../models");

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.uuid);
    });

    passport.deserializeUser(function (uuid, done) {
        db.Accounts.findById(uuid).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
    passport.use(
        "local-signup",
        new LocalStrategy({
                usernameField: "email",
                passwordField: "account_key",
                passReqToCallback: true
            },


            function (req, email, account_key, done) {
                process.nextTick(function () {
                    db.Accounts.findOne({
                        where: {
                            email: email
                        }
                    }).then(function (user, err) {
                        if (err) {
                            console.log("err", err)

                            return done(err)
                        }
                        if (user) {
                            console.log("signupMessage", "Email already taken.");

                            return done(null, false, req.flash("signupMessage", "Email already taken."));

                        } else {
                            db.Accounts.create({
                                fname: req.body.fname,
                                lname: req.body.lname,
                                email: req.body.email,
                                account_key: db.Accounts.generateHash(account_key)

                            }).then(function (dbUser) {
                                return done(null, dbUser);
                            }).catch(function (err) {
                                console.log(err);
                            });
                        }
                    });
                });
            }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'account_key',
            passReqToCallback: true
        },

        function (req, email, account_key, done) {
            db.Accounts.findOne({
                where: {
                    email: req.body.email
                }
            }).then(function (user, err) {
                    (!user.validPassword(req.body.account_key)));
                if (!user) {
                    console.log("no user found");
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                if (user && !user.validPassword(req.body.account_key)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }
                return done(null, user);
            });
    }));

};
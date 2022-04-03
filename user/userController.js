const express = require("express");
const router = express.Router();
const UserTable = require("./User");
const bcrypt = require('bcryptjs');



router.get("/admin/users", (req, res) => {
    UserTable.findAll().then(users => {
        res.render('../views/Admin/users/index',{users: users});
    });
});



router.get("/login", (req, res) => {
    res.render("../views/Admin/users/login");
});

router.post("/authenticate", (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    UserTable.findOne({where:{email: email}})
            .then(user => {
                 if(user != undefined){ // Se existe um usuário com esse e-mail
            // Validar senha
            var correct = bcrypt.compareSync(password,user.password);

            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles");
            }else{
                res.redirect("/login"); 
            }

        }else{
            res.redirect("/login");
        }
    });

});

router.get("/admin/users/create",(req, res) => {

    res.render('../views/Admin/users/create');
});


router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    
    UserTable.findOne({where:{email: email}}).then( user => {
        if(user == undefined){

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            
            UserTable.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/admin/users");
            }).catch((err) => {
                console.log(err);
            });


        }else{
            res.redirect("/admin/users/create");
        }
    });
});

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
})


module.exports = router;
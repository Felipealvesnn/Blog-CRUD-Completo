const express = require("express");
const router = express.Router();
const category = require("./categories");
const slugfy =  require("slugify");

router.get("/categories", (req, res)=>{
    res.send('rota de categgorias');
});
router.get("/admin/articles/new",(req, res)=>{
    res.render('../views/Admin/categories/new');

});
router.post("/categories/save", (req, res)=>{
   var titla= req.body.title;

   if(titla != undefined){
       category.create({
           title:titla,
           slug: slugfy(titla)

       }).then(()=>{
           res.redirect("/")
       })

   }else{
       res.redirect('/admin/articles/new')
   }
});

router.get("/admin/categories",(req, res)=>{

    res.render("./Admin/categories/index");

});



module.exports = router;
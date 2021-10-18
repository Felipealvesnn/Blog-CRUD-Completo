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

   if(titla == undefined){

    res.redirect('/admin/articles/new')
   
   }else{

    category.create({
        title:titla,
        slug: slugfy(titla)

    }).then(()=>{ res.redirect("/admin/categories")})

   }
});

router.get("/admin/categories",(req, res)=>{

    category.findAll().then(categories =>{

        res.render("./Admin/categories/index", {categoriesFront: categories} );
    })

    

});

router.post('/categories/delete', (req, res)=>{
    var id = req.body.id;
    if(id != undefined){

            category.destroy({
                where: {

                    id:id
                }
            }).then(()=>{
                res.redirect('/admin/categories')
            })

      

    }else // se o Id for nulo
    {
        res.redirect('/admin/categories')

    }
})



module.exports = router;
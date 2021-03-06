const express = require("express");
const router = express.Router();
const category = require("./categories");
const slugfy =  require("slugify");
const autorize = require("../midwhere/midwhare");

router.get("/categories", (req, res)=>{
    res.send('rota de categgorias');
});

router.get("/admin/categories/new",autorize,(req, res)=>{
    res.render('../views/Admin/categories/new');

});
router.post("/categories/save", (req, res)=>{
   var titla = req.body.title;

   if( isNaN( titla) && titla!= undefined ){

    category.create({
        title:titla,
        slug: slugfy(titla)

    }).then(()=>{ res.redirect("/admin/categories")})

    
   }else{

    //res.redirect('/admin/articles/new')
    res.send('ta mandando errado ai');

   }
});

router.get("/admin/categories",autorize,(req, res)=>{

    category.findAll({raw: true,order: [['id', 'DESC']]}).then(categorieslist =>{

        res.render("./Admin/categories/index", {categoriesFront: categorieslist} );
    })

});

router.post('/categories/delete', autorize,(req, res)=>{
    var id = req.body.id;
    if(id != undefined){

            category.destroy({
                where: {

                    id:id
                }
            }).then(()=>{ res.redirect('/admin/categories')})

      

    }else // se o Id for nulo
    {
        res.redirect('/admin/categories')

    }
})

router.get("/admin/categories/edit/:id", autorize,(req , res)=>{
    var id = req.params.id;
    if(isNaN(id)){res.redirect('/admin/categories')}
    category.findByPk(id).then(categoria=>{
        if (categoria != undefined){

            res.render("./Admin/categories/edit", {categoryFront:categoria})


        }else{ 
            res.redirect('/admin/categories')
        }
    })
});


router.post("/categories/update", (req, res)=>{
    var id = req.body.id;
    var title = req.body.title;

    category.update({title:title, slugfy:slugfy(title)},{
        where:{
            id:id
        }
    }).then(()=>{ res.redirect('/admin/categories')})


});


module.exports = router;
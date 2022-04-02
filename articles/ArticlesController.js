const express = require("express");
const router = express.Router();
const articleTable = require("./articles");
const categoryTable = require("../categories/categories");
const slugfy =  require("slugify");


router.get("/articles", (req, res)=>{
    articleTable.findAll({
        include:[{model:categoryTable}]
    }).then(articles=>{
        res.render('../views/Admin/articles/index',{articlesFront:articles})
    });
    
});

router.get("/admin/articles/new",(req, res)=>{
    categoryTable.findAll().then(categoriesList =>{
    res.render('../views/Admin/articles/new',{categoryFront:categoriesList});
    })
});


router.post("/articles/save", (req, res)=>{
    var titla = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    articleTable.create({
        title:titla,
        slug:slugfy(titla),
        body:body,
        categoryId:category
    }).then(()=>
        { res.redirect("/articles")})

});


router.get("/admin/articles/edit/:id", (req , res)=>{
    var id = req.params.id;
    if(isNaN(id) && id!= undefined)
    {res.redirect('/admin/categories')}
    articleTable.findByPk(id).then(Element=>{

        if (Element != undefined){
            categoryTable.findAll().then(categories => {

                res.render("admin/articles/edit", {categoriesFront: categories, articleFront:Element}) })


        }else{ 
            res.redirect('/articles')
        }
    })
});

router.post("/articles/update", (req, res)=>{
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    articleTable.update({title:title, slugfy:slugfy(title),
        body:body, categoryId: category},
        {
        where:{
            id:id
        }
    }).then(()=>{ res.redirect('articles')})

    .catch(err => {
        res.redirect("/");
    });


});

router.post('/articles/delete', (req, res)=>{
    var id = req.body.id;
    if(id != undefined){

            articleTable.destroy({
                where: {

                    id:id
                }
            }).then(()=>{ res.redirect('/articles')})

      

    }
    else // se o Id for nulo
    {
        res.redirect('/articles')

    }
})
      

module.exports = router;
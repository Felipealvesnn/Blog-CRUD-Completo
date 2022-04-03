const express = require("express");
const router = express.Router();
const articleTable = require("./articles");
const categoryTable = require("../categories/categories");
const slugfy =  require("slugify");


router.get("/admin/articles", (req, res)=>{
    articleTable.findAll({
        order: [
            ["id","DESC"]
          ],
        include:[{model:categoryTable}],
        limit: 5
    }).then(articles=>{
        res.render('../views/Admin/articles/index',{articlesFront:articles})
    });
    
});

router.get("/admin/articles/page/:num",(req, res) =>{
    var page = req.params.num;
    var offset = 0;
    if(isNaN(page || page ==1)){
        offset = 0;
    }else{
        offset = (parseInt(page) - 1) * 4;
    }
    articleTable.findAndCountAll({
        order: [
            ["id","DESC"]
          ],
        include:[{model:categoryTable}],
        limit:5,
        offset:offset

    }).then(article=>{

        var next;
        if(offset +4 >= article.count ){
            next=false
        }
        else{
            next = true;
        }
        var result = {
            page: parseInt(page),
             articleFront:article,
             next:next
        }
        categoryTable.findAll().then(category=>{
            res.render("../views/Admin/articles/pageAdmin" ,{  result:result, categoriesFront:category});

        })
        
        
    })

})


router.get("/articles/page/:num",(req, res) =>{
    var page = parseInt(req.params.num);
    var offset = 0;
    if(isNaN(page || page==1)){
        offset=0;
    }else{
        offset= (page-1)*5;
    }
    articleTable.findAndCountAll({
        order: [
            ["id","DESC"]
          ],
        limit:5,
        offset:offset

    })
    .then(article=>{

        var next;
        if(offset +5 >= article.count ){
            next=false
        }
        else{
            next = true;
        }
        var result = {
             articleFront:article,
             next:next
        }
        categoryTable.findAll().then(category=>{
            res.render("../views/Admin/articles/page" ,{ pageFront:page, result:result, categoriesFront:category});

        })
        
        
    })

})


router.get("/admin/articles/new",(req, res)=>{
    categoryTable.findAll().then(categoriesList =>{
    res.render('../views/Admin/articles/new',{categoryFront:categoriesList});
    })
});


router.post("/articles/save", (req, res)=>{
    var titla = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    if( isNaN( titla) && titla!= undefined ){
        articleTable.create({
            title:titla,
            slug:slugfy(titla),
            body:body,
            categoryId:category
        }).then(()=>
            { res.redirect("/articles")})
            .catch((err) => {
                console.log(err)
            });

    }else{
        res.send("Tem coisa errada ai");
    }
    

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
const express = require("express");
const app = express();
const connection = require("./database/database");

const categoriesController = require("./categories/categoriesController");
const ArticlesController = require("./articles/ArticlesController");
const Articlestable = require("./articles/Articles");
const categoriestable = require("./categories/categories");

app.set("view engine", "ejs"); //to dizendo qual vai ser a minha engine
app.use(express.static("public")); //arquivos estaticos
//bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connection
  .authenticate()
  .then(() => {
    console.log("Conexão com banco de dados sucesso");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", categoriesController);
app.use("/", ArticlesController);

app.get("/", (req, res) => {
  Articlestable.findAll({
    order: [
      ["id","DESC"]
    ],
    limit: 4,
  }).then((articlesgoriesList) => {
    categoriestable.findAll().then((categories) => {
      res.render("index", {
        articleFront: articlesgoriesList,
        categoriesFront: categories,
      });
    });
  });
});



app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Articlestable.findOne({
    where: {
      slug: slug,
    },
  })
    .then((articlesgoriesList) => {
      if (articlesgoriesList != undefined) {
        categoriestable.findAll().then((categories) => {
          res.render("articles", {
            articleFront: articlesgoriesList,
            categoriesFront: categories,
          });
        });
      } else {
        // res.redirect("/");
        res.send("tem coisa errada");
      }
    })
    .catch((err) => {
      //res.redirect("/");
      res.send("tem coisa errada");
    });
});

app.get("/category/:slug",(req, res)=>{
  var slug = req.params.slug;
  categoriestable.findOne({
    where: {
      slug: slug,
    },
    include:[{model:Articlestable}]
  }).then(category=>{
    if (category!=undefined){
      categoriestable.findAll().then((categories) => {
        res.render("index", {
          articleFront: category.articles,
          categoriesFront: categories,
        });
      });


    }else{
      res.send("Coisa errada ai mermao");
    }

  }).catch((err) => {
    //res.redirect("/");
    console.log(err)
  });
})





app.listen(8080, () => {
  console.log("O SERVIDOR ESTÁ RODANDO");
});

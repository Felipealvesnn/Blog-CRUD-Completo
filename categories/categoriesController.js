const express = require("express");
const router = express.Router();

router.get("/categories", (req, res)=>{
    res.send('rota de categgorias');
});
router.get("/admin/articles/new",(req, res)=>{
    res.send('Nova Categoria');

});
module.exports = router;
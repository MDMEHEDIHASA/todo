const asyncHandler = require('express-async-handler')
const db = require('../util/database')


exports.getallProducts = asyncHandler(async(req,res)=>{
    //console.log('all users',req.user);
    const [getAllProducts] = await db.execute("SELECT * from store WHERE userId=?",[req.user._id])    
    res.json(getAllProducts)
})


exports.createProduct = asyncHandler(async(req,res)=>{
    const {text,rating} = req.body
    //console.log(req.body,req.user)
    const [saveProduct] = await db.execute("INSERT INTO store (title,rating,userId) VALUES(?,?,?)",[text,rating,req.user._id])
    const [getProduct] = await db.execute("SELECT * FROM store where id=?",[saveProduct.insertId])
    res.json(getProduct)
})

exports.updateProduct = asyncHandler(async(req,res)=>{
    try{
        const productId =  req.params.id;
    //console.log(productId)
    const {text,rating} = req.body
    //console.log('check work or not.',req.body);

    let sql = "UPDATE store SET title=?,rating=? WHERE id=?";
    let records = [
        text,
        rating,
        productId
      ];
      const [updateProduct] = await db.execute(
        sql,records
        
      );
    //const [updateusers] = await db.execute("UPDATE store SET text=?,rating=? WHERE id=?",[text,rating,userId]);
    const [getUpdatedProduct] = await db.execute("SELECT * FROM store WHERE id=?",[productId]);
    res.json(getUpdatedProduct[0]);
    }catch(error){
        throw new Error(error)
    }
    
})

exports.removeProduct = asyncHandler(async(req,res)=>{
    const productId = req.params.id
    const [deleteproduct] = await db.execute("DELETE FROM store WHERE id=?",[productId]);
    res.json(deleteproduct);
})
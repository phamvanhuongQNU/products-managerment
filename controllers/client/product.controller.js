// [GET] /products

const Product = require('../../models/product.model') 

module.exports.index = async(req,res)=>{
    const products = await Product.find({
        deleted: false,
        status : "active"
    }).sort({position : "desc"});
     const newProducts = products.map((item)=>{
        // create new key is newPrice for products
        item.newPrice = item.price - (item.price *item.discountPercentage / 100);
        item.newPrice = item.newPrice.toFixed(2);
        return item;
    })
    console.log(products)
    
    res.render("client/pages/products/index",{
        Pagetitle : "Sản phẩm",
        products : newProducts
    })
}
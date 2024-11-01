const Products = require("../../models/product.model");
const fillterStatusHelper = require("../../helpers/fillterStatus");
const searchHelper = require("../../helpers/searchProducts");
const paginationHelper = require("../../helpers/pagination");

const { prefixAdmin } = require("../../config/system");

// [GET] /admin/products
module.exports.products = async (req, res) => {
  let find = {
    deleted: false,
  };
  // Lọc
  let fillterStatus = fillterStatusHelper(req.query);
  if (req.query.status) {
    find.status = req.query.status;
  }

  // Tìm sản phẩm
  let objectSearch = searchHelper(req.query);
  if (objectSearch.regex) find.title = objectSearch.regex;
  // Phân trang
  const countProduct = await Products.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 3,
    },
    countProduct,
    req.query
  );

  const products = await Products.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip)
    .sort({ position: "desc" });

  res.render("admin/pages/products/index", {
    pageTitle: "Trang quản lí sản phẩm",
    products: products,
    fillterStatus: fillterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// [PATCH] admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  // Cật nhập
  await Products.updateOne({ _id: id }, { status: status });
  // Chuyển hướng về lại trang trước
  req.flash("success", "Cât nhật trạng thái thành công");
  res.redirect("back");
};
// [PATCH] admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const ids = req.body.ids.split(",");
  const type = req.body.type;
  switch (type) {
    case "active": {
      await Products.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Cật nhật trạng thái ${[...ids].length} sản thành công`);

      break;
    }
    case "inactive": {
      await Products.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `Cật nhật trạng thái ${[...ids].length} sản phẩm thành công`);
      break;
    }
    case "delete": {
      await Products.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      req.flash("success", `Đã xoá ${[...ids].length} sản phẩm`);

      break;
    }
    case "change-position": {
      for (const item of ids) {
        // Phá vỡ cấu trúc
        const [id, position] = item.split("-");
        await Products.updateOne({ _id: id }, { position: parseInt(position) });
      }
      break;
    }
    default:
      break;
  }
  res.redirect("back");
};

// [DELETE] admin/products/delete/:id
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  // await Products.deleteOne({_id:id}); Xoá cứng
  await Products.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  );
  req.flash("success", "Xoá sản phẩm thành công");

  res.redirect("back");
};

// [GET] admin/products/create
module.exports.createProducts = (req,res)=>{
  res.render("admin/pages/products/create",{
    pageTitle : "Thêm sản phẩm"
  })
}
// POST admin/products/create
module.exports.createPostProducts =async (req,res)=>{
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  
  if (req.body.position == ""){
    const countProduct =  await Products.countDocuments();
    req.body.position =countProduct + 1
  }
  if(req.file)
    req.body.thumbnail = `/uploads/${req.file.filename}`
  // console.log(req.file) 
  // Thêm sản phẩm
  const product = new Products(req.body)
  await product.save();
  req.flash("success", "Thêm sản phẩm thành công");
  res.redirect(`${prefixAdmin}/products`);
}

// Sửa sản phẩm
// GET /admin/product/edit/:id
module.exports.editProduct =async (req,res) =>{
  try{
    let find = {
      deleted : false,
      _id : req.params.id
    }
    const product = await Products.findOne(find);
    // console.log(product) 
    res.render("admin/pages/products/edit",{
      pageTitle : "Chỉnh sửa sản phẩm",
      product : product
    })
  }
  catch{
    res.redirect(`${prefixAdmin}/products`);
  }
}
// PATCH /admin/product/edit/:id
module.exports.editProductPatch =async (req,res) =>{
  console.log(req.body);
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  
  req.body.position = parseInt(req.body.position);
  if(req.file)
    req.body.thumbnail = `/uploads/${req.file.filename}`
  try{
  await Products.updateOne({_id : req.params.id},req.body)
  req.flash("success", "Cật nhật thành công");
  }
  catch{
  req.flash("error", "Cật nhật thất bại");
}
  res.redirect("back");
}

// Chi tiết sản phẩm
// GET /admin/product/detail/:id
module.exports.detailProduct =async (req,res) =>{
  try{
    const id = req.params.id;
    const find = {
      _id : id,
      deleted : false
    }
    const product = await Products.findOne(find)
    res.render("admin/pages/products/detail",{
      pageTitle : "Chi tiết sản phẩm",
      product : product
    })
  }catch{
    res.redirect(`${prefixAdmin}/products`);
  }
}
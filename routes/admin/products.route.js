const express = require("express");
const controller = require("../../controllers/admin/products.controller.js");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/uploadCloud.middleware.js")
const route = express.Router();
const validate = require("../../validates/admin/product.validates");
// In ra giao diện
route.get("/", controller.products);
route.get("/create", controller.createProducts);
route.get("/edit/:id", controller.editProduct);
route.get("/detail/:id", controller.detailProduct);
// Thay đổi dữ liệu
route.patch("/change-status/:status/:id", controller.changeStatus);
route.patch("/change-multi", controller.changeMulti);
route.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editProductPatch
);
// Xoá
route.delete("/delete/:id", controller.deleteProduct);

// validate.createPost được gọi là middileware
route.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPostProducts
);

// edit product

module.exports = route;

module.exports = (objectPagination,countProduct,query)=>{
    
    if(query.page){
        objectPagination.currentPage =parseInt(query.page);
        objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem
    }
    // Đếm số lượng trang
    
    const totalPage = Math.ceil(countProduct / objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    return objectPagination
}
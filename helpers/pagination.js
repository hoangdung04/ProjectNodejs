module.exports = (objectPagination, req, countProducts) => {
   
  if(req.page){
    objectPagination.currentPage = parseInt(req.page);
  }
  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
  const totalPage = Math.ceil(countProducts / objectPagination.limitItems);
  objectPagination.totalPage = totalPage;
  return objectPagination;
}
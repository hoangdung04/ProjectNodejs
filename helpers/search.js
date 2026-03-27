module.exports = (req) => {
  let objectSearch = {
    keyword: "",
  }
  if(req.keyword){
    objectSearch.keyword = req.keyword;
    const regex = new RegExp(objectSearch.keyword, "i");
    objectSearch.regex = regex;
  }
  return objectSearch
}
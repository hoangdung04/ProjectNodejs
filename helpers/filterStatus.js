 module.exports = (query) =>{
    let filterStatus = [
    { status: "", name: "Tất cả" ,class: ""},
    { status: "active", name: "Hoạt động", class: "" },
    { status: "notWorking", name: "Dừng hoạt động", class: "" },
  ];
  if(query.status){
    const index = filterStatus.findIndex(item => item.status == query.status);
    filterStatus[index].class = "active";
  }else{
    const index = filterStatus.findIndex(item => item.status == "");
    filterStatus[index].class = "active";
  }
  return filterStatus;
}
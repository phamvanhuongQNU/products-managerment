
module.exports = (query)=>{
    let fillterStatus = [
        {
            name : "Tất cả",
            status : "",
            class : ""
        },
        {
            name : "Hoạt động",
            status : "active",
            class : ""
        },
        {
            name : "Dừng hoạt động",
            status : "inactive",
            class : ""
        },
    ]
    if (query.status){
        // Thêm class active chho các nút được chọn
        const index = fillterStatus.findIndex(item => item.status == query.status)
        fillterStatus[index].class = "active";
    }else
        fillterStatus[0].class = "active";
    return fillterStatus;
}
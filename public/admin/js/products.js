// Change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

const formChangeStatus = document.querySelector("#form-change-status")
const path = formChangeStatus.getAttribute("data-path");
if (buttonChangeStatus.length > 0) {
  buttonChangeStatus.forEach((item) => {
    item.addEventListener("click", () => {
      const status = item.getAttribute("data-status");
      const id = item.getAttribute("data-id");
      const changeStatus = status == "active" ? "inactive" : "active";
      formChangeStatus.action = `${path}/${changeStatus}/${id}?_method=PATCH`;

      // Tự động submit
      formChangeStatus.submit();
    });
  });
}
// Change Status
// Delete Item
const buttonDelete = document.querySelectorAll("[button-delete]")
if (buttonDelete){
  const formDelete = document.querySelector("#form-delete");
  const path = formDelete.getAttribute("data-path");
  
  buttonDelete.forEach(item =>{
    item.addEventListener("click",()=>{
      const id = item.getAttribute("data-id");
      formDelete.action = `${path}/${id}?_method=DELETE`
      formDelete.submit();
    })
  })
}

// BUTTON STATUS
const buttons = document.querySelectorAll("[button-status]");
// hoặc dùng card-body button cũng được
let url = new URL(window.location.href);
buttons.forEach((item) => {
  item.addEventListener("click", () => {
    const status = item.getAttribute("button-status");
    status
      ? url.searchParams.set("status", status)
      : url.searchParams.delete("status");
    window.location.href = url.href;
  });
});

// FORM SEARCH
const formSearch = document.querySelector("#form-search");

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = e.target.elements.keyword.value;
  keyword
    ? url.searchParams.set("keyword", keyword)
    : url.searchParams.delete("keyword");
  window.location.href = url;
});
// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
  buttonsPagination.forEach((item) => {
    item.addEventListener("click", () => {
      const page = item.getAttribute("button-pagination");
      page
        ? url.searchParams.set("page", page)
        : url.searchParams.delete("page");
      window.location.href = url;
    });
  });
}
// Checkbox multi

// truy vấn vào thuộc tính checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("[name=checkAll]");
  const inputsId = checkboxMulti.querySelectorAll("[name=id]");

  // Chọn tất cả
  inputCheckAll.addEventListener("click", () => {
    const checked = inputCheckAll.checked;
    inputsId.forEach((item) => (item.checked = checked));
  });
  // Chọn 1 nút
  inputsId.forEach((item) => {
    item.addEventListener("click", () => {
      const count = checkboxMulti.querySelectorAll(
        "[name = id]:checked"
      ).length;
      count === inputsId.length
        ? (inputCheckAll.checked = true)
        : (inputCheckAll.checked = false);
    });
  });
}

// Checkbox multi

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");

if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkboxMulti.querySelectorAll("[name=id]:checked");
    const inputIds = formChangeMulti.querySelector("input[name = ids]");
    const ids = [];

    // Lấy tên loại sự kiện
    const type = e.target.elements.type.value;
    if (type == "delete") {
      const isConfirm = confirm("Bạn có chắc muốn xoá");
      if (!isConfirm) return;
    }
    inputChecked.forEach((input) => {
      const id = input.value;
      if (type == "change-position") {
        const position = input
          .closest("tr")
          .querySelector("input[name=position]").value;
       
        ids.push(`${id}-${position}`);
      } 
      else 
        ids.push(id);
    });
    if (ids.length > 0) {
      inputIds.value = ids.join(",");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi");
    }
  });
}
//End form change multi

// Show alter
const showAlter = document.querySelector("[show-alert]")
if (showAlter){
  const time = parseInt(showAlter.getAttribute("data-time"));
  console.log(time)
  setTimeout(()=>{
      showAlter.classList.add("alert-hidden");
  },time)
}  

// End show alter

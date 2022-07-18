import { data } from "./data.js";
var array = data;

const body = $("#tbody");
const search = $(".search");
const pagination = $(".pagination");

$(document).ready(function () {
  var maxRows = parseInt($(".maxRows").val());
  var page = 1;
  buildTable(array, page, maxRows);
  //
  // $(".pagination li").eq(0).addClass("active");
  pagination.on("click", "li", function () {
    page = $(this).attr("data-page");
    buildTable(array, page, maxRows);
  });
  //
  $(".maxRows").on("change", function () {
    maxRows = parseInt($(this).val());
    page = 1;
    buildTable(array, page, maxRows);
  });
  //
  search.on("input", function (e) {
    let value = e.target.value;
    let data = searchData(value);
    buildTable(data, page, maxRows);
    // console.log(value);
  });
  //
  $(".arrow").on("click", function (e) {
    let sort = $(this);
    let name = sort.data("name");
    let order = sort.data("order");
    let text = "";
    if (order === "asc") {
      sort.data("order", "desc");
      text = "&#9650";
      array = array.sort((a, b) =>
        a[name].toLowerCase() > b[name].toLowerCase() ? 1 : -1
      )
    } else {
      sort.data("order", "asc");
      text = "&#9660";
      array = array.sort((a, b) =>
        a[name].toLowerCase() < b[name].toLowerCase() ? 1 : -1
      );
    }
    sort.html(text);
    buildTable(array, page, maxRows);
  });
});
//
function buildTable(data, page, row) {
  let str = "";
  let start = (page - 1) * row;
  let end = page * row < data.length ? page * row : data.length;
  for (let i = start; i < end; i++) {
    str += `
        <tr>
            <td>${data[i].engine}</td>
            <td>${data[i].browser}</td>
            <td>${data[i].platform || "-"}</td>
            <td>${data[i].engineVersion || "-"}</td>
            <td>${data[i].cssGrade}</td>
        </tr>
        `;
  }
  body.html(str);
  buildNav(data.length, row);
  $(".pagination li").removeClass("active");
  $(".pagination li")
    .eq(page - 1)
    .addClass("active");
}
//
function buildNav(quantities, rows) {
  pagination.html("");
  let pages = Math.ceil(quantities / rows);
  for (let i = 1; i <= pages; i++) {
    pagination.append(
      '<li data-page = "' + i + '" class="button"><span>' + i + "</span></li>"
    );
  }
}
//
function searchData(value) {
  if (value === "") {
    return array;
  }
  value = value.toLowerCase();
  const res = [];
  array.forEach((item) => {
    for (let prop in item) {
      if ((item[prop] + "").toLowerCase().includes(value)) {
        res.push(item);
        // break;
      }
    }
  });
  return res;
}

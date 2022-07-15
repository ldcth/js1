import { data } from "./data.js";
var array = data;
console.log(array[0]["engine"]);

const body = $("#tbody");
const search = $("#search");
const length = array.length;

search.on("input", function (e) {
  let value = e.target.value;
  let data = searchData(value, array);
  buildTable(data);
});

function searchData(value, data) {
  if (value === "") {
    return array;
  }
  value = value.toLowerCase();

  const res = [];

  data.forEach((item) => {
    for (let prop in item) {
      if ((item[prop] + "").toLowerCase().includes(value)) {
        res.push(item);
        break;
      }
    }
  });
//   for (let i = 0; i < data.length; i++) {
//     if (data[i].engine.toLowerCase().includes(value)) {
//       res.push(data[i]);
//     }
//   }
  return res;
}
buildTable(array);

function buildTable(data) {
  let str = "";
  for (let i = 0; i < data.length; i++) {
    str += `
        <tr>
            <td>${data[i].engine}</td>
            <td>${data[i].browser}</td>
            <td>${data[i].platform || "-"}</td>
            <td>${data[i].engineVersion || "-"}</td>
            <td>${data[i].cssGrade}</td>
        </tr>
        `;
    body.html(str);
  }
}

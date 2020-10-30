// const body = document.querySelector('.content')
// body.insertAdjacentHTML(`beforeend`,`<h1>JS scripts online</h1>`)

//https://www.youtube.com/watch?v=rLNxhkmVdE8


// document.addEventListener('DOMContentLoaded', function () {
//     fetch('/getAll')
//     .then(response => response.json())
//     .then(data => loadHTMLTable(data['data']));
// })




// function loadHTMLTable(data) {
//     const table = document.querySelector('table tbody');

//     if (data.length === 0) {
//         table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
//         return;
//     }

//     let tableHtml = "";

//     data.forEach(function ({id, name, date_added}) {
//         tableHtml += "<tr>";
//         tableHtml += `<td>${id}</td>`;
//         tableHtml += `<td>${name}</td>`;
//         tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
//         tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
//         tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
//         tableHtml += "</tr>";
//     });

//     table.innerHTML = tableHtml;
// }
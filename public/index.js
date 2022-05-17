const socket = io();

socket.on('base_data', (data) => {
  console.log(data);
  render(data);
});

socket.on('products_data', (dataBase) => {
  console.log(dataBase);
  renderProduct(dataBase);
});

// Products
const renderProduct = (dataBase) => {
  const html = dataBase.map((pr) => `
      <tr>
        <th class="tr">${pr.name}</th>
        <td class="tr">$${pr.price}</td>
        <td class="tr"><img class="imagen" src="${pr.image}"></td>
      </tr>
    `).join(' ');

  document.querySelector('#productsList').innerHTML = html;
};

const addProduct = () => {
  const dataObj = {
    name: document.querySelector('#nm').value,
    price: document.querySelector('#pr').value,
    image: document.querySelector('#im').value,
  };
  console.log(dataObj);
  socket.emit('dataProducts', dataObj);
  return false;
};

// Message
const render = (data) => {
  const html = data.map((x) => `
      <p><strong>${x.nameUser}</strong> : ${x.messageUser}<p>
    `).join(' ');

  document.querySelector('#caja').innerHTML = html;
};

const addMessage = () => {
  const dataObj = {
    nameUser: document.querySelector('#nb').value,
    messageUser: document.querySelector('#msn').value,
  };
  socket.emit('dataMsn', dataObj);
  console.log(dataObj);
  return false;
};

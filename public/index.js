const socket = io();

socket.on('base_data', (data) => {
  console.log(data);
  render(data);
});

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

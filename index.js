document.addEventListener('click', handleBtnClick);


function handleBtnClick(event) {
  let btnId = (event.target.className === "btn-service") ? event.target.id : null;
  console.log(btnId)
  if (!btnId) return;

  const data = new Blob();

  const resultArea = document.getElementById("result-area");

  yandexRequest(data).then(
    (data) => {
      resultArea.innerText = data;
    },
    (error) => {
      resultArea.innerText = "Error";
      console.log(error);
    });
}

async function yandexRequest(data) {
  let result = await fetch(`https://stt.api.cloud.yandex.net/speech/v1/stt:recognize?topic=general&lang=ru-RU&folderId=${Y_F_ID} HTTP/1.1`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${Y_TOKEN}`,
      'Host': 'stt.api.cloud.yandex.net',
      'Transfer-Encoding': 'chunked'
    },
    body: document.getElementById("audio").value,
  })
  return result;
}

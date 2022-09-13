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
    });
}

async function yandexRequest(data) {
  let result = await fetch(YANDEX_URL, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${YANDEX_TOKEN}`,
      'folderId': YANDEX_F_ID,
      'lang': 'en-US',
    },
    body: data,
  })
  result = await result.json();
  return JSON.parse(await result).result;
}

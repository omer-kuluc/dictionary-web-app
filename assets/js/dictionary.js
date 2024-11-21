async function init() {
  // fetch eğer belirtilmezse get isteği gönderir
  let data = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/word').then(response => response.json());


}


init();

const wordArea = document.querySelector('.word-area');
const inputSearch = document.querySelector('.inputSearch');
const filterForm = document.getElementById('filterForm');

let filteredText = ''; // global filtrelenen kelime değişkeni oluşturdum
filterForm.addEventListener('submit', handleSubmit);

const meaningsArea = document.querySelector('.meanings-area');

async function handleSubmit(e) {
  e.preventDefault();
  filteredText = filterForm.filteredWord.value.toLocaleLowerCase('en');


  if (!filteredText) {
    wordArea.innerText = "Lütfen bir kelime girin.";
    return;
  }

  // Dinamik URL oluştur
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${filteredText}`;

  try {
    // Fetch isteği gönder
    const response = await fetch(apiUrl);

    // Yanıtı kontrol et
    if (!response.ok) {
      wordArea.innerText = `Kelime bulunamadı: ${filteredText}`;
      return;
    }

    const data = await response.json();
    console.log(data); // Debug için

    // Başarılı bir sonuç alındığında kelimeyi göster
    wordArea.innerText = `Bulunan kelime: ${data[0].word}`;
    // console.log(`${data[0].meanings}`);


    meaningsArea.innerHTML = `
    <p>Meaning : </p>
    ${data[0].meanings[0].definitions[0].definition}`;

  } catch (error) {
    wordArea.innerText = "Bir hata oluştu. Lütfen tekrar deneyin.";
    console.error("Fetch hatası:", error);
  }

  // Input'u temizle
  inputSearch.value = "";
}


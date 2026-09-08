/* =========================
   TEXT GENERATOR
========================= */

const pesan = document.getElementById("pesan");
const jumlah = document.getElementById("jumlah");
const hasil = document.getElementById("hasil");
const counter = document.getElementById("counter");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");


generateBtn.addEventListener("click", () => {

  const text = pesan.value.trim();
  let count = parseInt(jumlah.value);

  if (!text) {
    alert("Tulis pesan terlebih dahulu.");
    return;
  }

  if (!count || count < 1) {
    alert("Jumlah pengulangan tidak valid.");
    return;
  }

  if (count > 10000) {
    count = 10000;
    jumlah.value = 10000;
  }

  hasil.value = Array(count).fill(text).join("\n");

  counter.textContent =
    `${count.toLocaleString("id-ID")}x text dibuat`;
});


copyBtn.addEventListener("click", async () => {

  if (!hasil.value.trim()) {
    alert("Belum ada text untuk disalin.");
    return;
  }

  try {

    await navigator.clipboard.writeText(hasil.value);

    copyBtn.textContent = "✅ Berhasil Disalin";

    setTimeout(() => {
      copyBtn.textContent = "📋 Salin";
    }, 1500);

  } catch (error) {

    hasil.select();
    document.execCommand("copy");

    copyBtn.textContent = "✅ Berhasil Disalin";

    setTimeout(() => {
      copyBtn.textContent = "📋 Salin";
    }, 1500);
  }
});


clearBtn.addEventListener("click", () => {

  pesan.value = "";
  hasil.value = "";
  jumlah.value = 10;

  counter.textContent =
    "Belum ada text dibuat";
});


/* =========================
   MUSIC
========================= */

const bgMusic =
  document.getElementById("bgMusic");

const musicBtn =
  document.getElementById("musicBtn");

const musicStatus =
  document.getElementById("musicStatus");

const musicSection =
  document.querySelector(".music-section");


musicBtn.addEventListener("click", async () => {

  try {

    if (bgMusic.paused) {

      await bgMusic.play();

      musicBtn.textContent =
        "⏸️ Jeda Musik";

      musicStatus.textContent =
        "🎵 Sesi Potret sedang diputar";

      musicSection.classList.add("playing");

    } else {

      bgMusic.pause();

      musicBtn.textContent =
        "▶️ Putar Musik";

      musicStatus.textContent =
        "Musik dijeda";

      musicSection.classList.remove("playing");
    }

  } catch (error) {

    console.error(error);

    alert(
      "Musik tidak bisa diputar. Pastikan file bernama sesi-potret.mp3"
    );
  }
});


bgMusic.addEventListener("ended", () => {

  musicBtn.textContent =
    "▶️ Putar Musik";

  musicStatus.textContent =
    "Musik selesai";

  musicSection.classList.remove("playing");
});


/* =========================
   LIRIK SESI POTRET
   SINKRON DENGAN VIDEO
========================= */

/*
   Timestamp sudah disesuaikan berdasarkan
   pergantian teks pada video yang kamu upload.

   Karena file MP3 memiliki pergeseran sekitar
   1.2 detik dibanding audio pada video,
   waktu di bawah sudah memperhitungkan
   pergeseran tersebut.
*/

const lyrics = [

  {
    time: 13.2,
    text: "Tahun lalu berjuta alasanku\nMaaf tak bisa pulang penghasilanku pas-pasan"
  },

  {
    time: 25.5,
    text: "Kali ini sudah lumayan\nBerkat doamu di ijabah sang maha kaya"
  },

  {
    time: 37.4,
    text: "Dan tahun ini kubisa pulang\nOleh-oleh sudah ditangan"
  },

  {
    time: 49.6,
    text: "Tapi anehnya bukan kau yang menyambutku"
  },

  {
    time: 55.2,
    text: "Oh ternyata kau yang lebih dulu pulang"
  },

  {
    time: 64.4,
    text: "Ku bertamu ke rumah barumu"
  },

  {
    time: 69.9,
    text: "Tak ada kamu\nHanya papan dan namamu"
  },

  {
    time: 76.2,
    text: "Mana ocehan wewangian khasmu"
  },

  {
    time: 81.8,
    text: "Jarak ini terlalu jauh\nKalau rindu aku tak mampu"
  },

  {
    time: 88.1,
    text: "Soal ikhlas ternyata aku masih amatir"
  },

  {
    time: 93.8,
    text: "Gengsi menyelimutiku\nManusia ini kehilanganmu"
  },

  /* =====================
     BAGIAN INSTRUMENTAL
  ====================== */

  {
    time: 126.7,
    text: "Sesi potret yang selalu ku benci\nAneh rasanya kau tak di sini"
  },

  {
    time: 139.3,
    text: "Susunan barisannya tak sama lagi"
  },

  {
    time: 143.7,
    text: "Oh ho ho satu dua tiga\nIni nyata kau telah pergi"
  },

  {
    time: 157.0,
    text: "Ku bertamu kerumah barumu"
  },

  {
    time: 162.6,
    text: "Tak ada kamu\nHanya papan dan namamu"
  },

  {
    time: 168.9,
    text: "Mana ocehan wewangian khasmu"
  },

  {
    time: 174.5,
    text: "Jarak ini terlalu jauh\nKalau rindu aku tak mampu"
  },

  {
    time: 180.8,
    text: "Sesal hatiku tak sempat temani kamu"
  },

  {
    time: 186.8,
    text: "Harusnya kubisikan kata ajaib ke telingamu"
  },

  {
    time: 193.0,
    text: "Soal ikhlas ternyata aku masih amatir"
  },

  {
    time: 198.8,
    text: "Masih sangat amatir"
  },

  {
    time: 204.6,
    text: "Gengsi menyelimutiku\nManusia ini kehilanganmu"
  },

  {
    time: 223.2,
    text: "Kehilanganmu"
  }

];


/* =========================
   RENDER LIRIK
========================= */

const lyricsContainer =
  document.getElementById("lyricsContainer");


function renderLyrics() {

  lyricsContainer.innerHTML = "";

  lyrics.forEach((lyric, index) => {

    const element =
      document.createElement("div");

    element.className =
      "lyric-line next";

    element.dataset.index =
      index;

    /*
      \n dibuat menjadi <br>
      supaya dua baris tampil seperti
      pada video.
    */

    element.innerHTML =
      lyric.text.replace(/\n/g, "<br>");

    lyricsContainer.appendChild(element);

  });
}


renderLyrics();


/* =========================
   SINKRONISASI LIRIK
   SMOOTH SCROLL
========================= */

let lastActiveIndex = -1;

bgMusic.addEventListener("timeupdate", () => {

  const currentTime = bgMusic.currentTime;

  let activeIndex = -1;

  for (let i = 0; i < lyrics.length; i++) {

    if (currentTime >= lyrics[i].time) {
      activeIndex = i;
    } else {
      break;
    }

  }

  const elements =
    lyricsContainer.querySelectorAll(".lyric-line");


  elements.forEach((element, index) => {

    element.classList.remove(
      "active",
      "past",
      "next"
    );

    if (index < activeIndex) {

      element.classList.add("past");

    } else if (index === activeIndex) {

      element.classList.add("active");

    } else {

      element.classList.add("next");

    }

  });


  /* =========================
     SCROLL HANYA SAAT
     LIRIK BERGANTI
  ========================= */

  if (
    activeIndex >= 0 &&
    activeIndex !== lastActiveIndex
  ) {

    const activeElement =
      elements[activeIndex];

    if (!activeElement) return;


    const containerHeight =
      lyricsContainer.clientHeight;

    const elementTop =
      activeElement.offsetTop;

    const elementHeight =
      activeElement.offsetHeight;


    const target =
      elementTop -
      (containerHeight / 2) +
      (elementHeight / 2);


    lyricsContainer.scrollTo({

      top: target,

      behavior: "smooth"

    });


    lastActiveIndex = activeIndex;

  }

});
const pesanInput = document.getElementById("pesan");
const jumlahInput = document.getElementById("jumlah");

const hasilOutput = document.getElementById("hasil");
const counter = document.getElementById("counter");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");


/* =========================
   BUAT TEXT
========================= */

function buatText() {

  const pesan = pesanInput.value.trim();
  const jumlah = Number(jumlahInput.value);

  if (!pesan) {
    alert("Tulis pesan terlebih dahulu!");
    return;
  }

  if (!jumlah || jumlah < 1) {
    alert("Jumlah pengulangan harus minimal 1.");
    return;
  }

  if (jumlah > 10000) {
    alert("Maksimal 10.000 pengulangan.");
    return;
  }

  const hasil = [];

  for (let i = 0; i < jumlah; i++) {
    hasil.push(pesan);
  }

  hasilOutput.value = hasil.join("\n");

  counter.textContent =
    `Berhasil membuat ${jumlah.toLocaleString("id-ID")} pengulangan.`;
}


/* =========================
   SALIN TEXT
========================= */

async function salinText() {

  const text = hasilOutput.value;

  if (!text) {
    alert("Belum ada hasil untuk disalin!");
    return;
  }

  try {

    await navigator.clipboard.writeText(text);

    alert("Text berhasil disalin! 📋");

  } catch (error) {

    hasilOutput.select();

    document.execCommand("copy");

    alert("Text berhasil disalin! 📋");
  }
}


/* =========================
   BERSIHKAN
========================= */

function bersihkan() {

  pesanInput.value = "";

  jumlahInput.value = 10;

  hasilOutput.value = "";

  counter.textContent =
    "Belum ada text dibuat";
}


/* =========================
   EVENT BUTTON
========================= */

generateBtn.addEventListener(
  "click",
  buatText
);

copyBtn.addEventListener(
  "click",
  salinText
);

clearBtn.addEventListener(
  "click",
  bersihkan
);
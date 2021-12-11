import "./styles.css";
import m from "mithril";

var buttonDisabled = true;
var resultText = "";
var hasResult = false;
var tenors = {
  "1": 14,
  "2": 16,
  "3": 18,
  "4": 20,
  "5": 22,
  "6": 24
};
var products = [
  { model: "New SX4 S-Cross M/T", price: "338575539" },
  { model: "New SX4 S-Cross M/T", price: "356475199" },
  { model: "XL7 GL ZETA MT", price: "248550000" },
  { model: "XL7 GL ZETA AT", price: "258200000" },
  { model: "XL7 GX BETA MT", price: "263900000" },
  { model: "XL7 GX BETA AT", price: "273700000" },
  { model: "XL7 GS ALPHA MT", price: "273900000" },
  { model: "XL7 GS ALPHA AT", price: "283700000" },
  { model: "All New Ertiga S MT", price: "267350000" },
  { model: "All New Ertiga S AT", price: "277150000" },
  { model: "All New Ertiga SF FF MT", price: "280350000" },
  { model: "All New Ertiga SF FF AT", price: "290150000" },
  { model: "All New Ertiga GA", price: "223900000" },
  { model: "All New Ertiga MC GL MT", price: "242700000" },
  { model: "All New Ertiga MC GL AT", price: "252500000" },
  { model: "All New Ertiga MC GX MT", price: "256000000" },
  { model: "All New Ertiga MC GX AT", price: "265850000" },
  { model: "New Baleno MT", price: "273987367" },
  { model: "New Baleno AT", price: "287996060" },
  { model: "Ignis GL MT", price: "200581019" },
  { model: "Ignis GL AT", price: "211851783" },
  { model: "Ignis GX MT", price: "211078638" },
  { model: "Ignis GX AT", price: "231407945" },
  { model: "APV GE2-PS", price: "218465000" },
  { model: "APV GL", price: "233073800" },
  { model: "APV GX", price: "246830000" },
  { model: "APV SGX MT", price: "252016900" },
  { model: "APV SGX LUXURY M/T R15", price: "268016900" },
  { model: "APV SGX LUXURY M/T R17", price: "272016900" },
  { model: "Carry PU FD", price: "174500000" },
  { model: "Carry PU WD", price: "177500000" },
  { model: "Carry PU FD AC PS", price: "183000000" },
  { model: "Carry PU WD AC PS", price: "186000000" },
  { model: "Carry PU FD AC PS LUX", price: "185000000" },
  { model: "Carry PU WD AC PS LUX", price: "188000000" },
  { model: "JIMNY STD M/T", price: "408500000" },
  { model: "JIMNY STD A/T", price: "421500000" },
  { model: "JIMNY 2 TONE M/T", price: "412500000" },
  { model: "JIMNY 2 TONE A/T", price: "424500000" },
  { model: "WGN GL MT", price: "151766650" },
  { model: "WGN R GL AGS", price: "161568300" },
  { model: "WGN R GS MT", price: "160385900" },
  { model: "WGN R GS AGS", price: "171747880" }
];
var model = "";
var harga = 0;
var dp = 0;
var tenor = "4";
var bunga = tenors[tenor];
var _bunga = harga / bunga;
var total_dp = dp;
var angsuran = 0;
var pinjaman = harga - dp;

function hitung() {
  console.log("hitung");
  let _rate = bunga / 1200;
  let _tahun = tenor;
  let _bulan = 12 * _tahun;
  pinjaman = harga - dp;
  console.log({ dp });
  let cicilan = pinjaman * _rate * (1 / (1 - 1 / Math.pow(1 + _rate, _bulan)));
  console.log({ cicilan });
  total_dp = dp + cicilan;
  console.log({ total_dp });
  angsuran = cicilan;
  _bunga = harga / bunga;
  resultText =
    "*Halo mas Wawan.* \n" +
    "Saya membuat perhitungan simulasi kredit dari situs https://suzukimataram.id dengan data dan hasil sbb: \n\n" +
    "*Model Mobil:* " +
    model +
    "\n" +
    "*Harga Mobil:* " +
    format(harga) +
    " \n" +
    "*DP:* " +
    format(dp) +
    " \n" +
    "*Tenor:* " +
    tenor +
    " tahun \n" +
    "*Angsuran:* " +
    format(angsuran) +
    " (" +
    _bulan +
    " bulan) \n\n" +
    "Tolong di bantu detail info dan prosedurnya. \n\n" +
    "Terima Kasih.";
  hasResult = true;
}

function hitungBunga() {
  _bunga = harga / bunga;
}

function format(input = 0) {
  if (typeof input === "string") {
    input = parseFloat(input);
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
    // maximumSignificantDigits: 7
  })
    .format(input)
    .replace(/(,\d+)$/, "");
}

function getTarget() {
  if (top && self && top.location && top.location !== self.location) {
    return "_top";
  }
  return "_blank";
}

function getProductLists() {
  return products.map((item) =>
    m("option", { value: item.price }, item.model + ` (${format(item.price)})`)
  );
}

const App = {
  view: () => {
    return [
      m("div", { class: "simulasi-app" }, [
        m("div", { class: "form" }, [
          m("label", "Pilih Model Mobil"),
          m(
            "select",
            {
              onchange: function () {
                harga = parseInt(this.value, 0);
                model = this.selectedOptions[0].text.replace(/\(.*\)$/, "");
                document.getElementById("harga").value = harga;
              }
            },
            [
              m("option", { value: "" }, "Pilih Model Mobil"),
              ...getProductLists()
            ]
          ),
          m("label", "Harga Mobil"),
          m("input", {
            type: "number",
            id: "harga",
            placeholder: "Masukkan harga Mobil",
            autofocus: true,
            oninput: function (e) {
              harga = parseInt(this.value, 0);
              console.log(e);
              if (harga && dp && buttonDisabled) {
                buttonDisabled = false;
              }
              if (!harga || !dp) {
                buttonDisabled = true;
              }
            },
            onchange: hitungBunga
          }),
          m("label", "DP"),
          m("input", {
            type: "number",
            id: "dp",
            placeholder: "Masukkan jumlah DP",
            oninput: function () {
              dp = parseFloat(this.value);
              if (harga && dp && buttonDisabled) {
                buttonDisabled = false;
              }
              if (!harga || !dp) {
                buttonDisabled = true;
              }
            }
          }),
          m("label", "Tenor"),
          m(
            "select",
            {
              value: tenor,
              onchange: function () {
                tenor = parseInt(this.value, 0);
                bunga = tenors[this.value];
                hitungBunga();
                if (!buttonDisabled && hasResult) {
                  hitung();
                }
              }
            },
            [
              m("option", { value: "1" }, "1 Tahun"),
              m("option", { value: "2" }, "2 Tahun"),
              m("option", { value: "3" }, "3 Tahun"),
              m("option", { value: "4" }, "4 Tahun"),
              m("option", { value: "5" }, "5 Tahun"),
              m("option", { value: "6" }, "6 Tahun")
            ]
          ),
          m(
            "button",
            {
              onclick: hitung,
              disabled: buttonDisabled
            },
            "HITUNG"
          )
        ]),
        m("div", { class: "result" }, [
          m("h3", { class: "data" }, "Data:"),
          m("p", { class: "harga" }, [
            m("strong", "Harga: "),
            m("em", "".concat(format(harga)))
          ]),
          m("p", { class: "dp" }, [m("strong", "DP: "), m("em", format(dp))]),
          m("p", { style: { display: "none" } }, [
            m("strong", "Bunga: "),
            m("em", "".concat(format(_bunga)).concat(` (${bunga}%)`))
          ]),
          m("p", { class: "tenor" }, [
            m("strong", "Tenor: "),
            m("em", "".concat(tenor).concat(" Tahun"))
          ]),
          m("h3", { class: "hasil" }, "Hasil"),
          m("p", { style: { display: "none" } }, [
            m("strong", "Total Pinjaman: "),
            m("em", format(pinjaman))
          ]),
          m("p", { style: { display: "none" } }, [
            m("strong", "Total DP: "),
            m("em", format(Math.floor(total_dp)))
          ]),
          m("p", { class: "angsuran" }, [
            m("strong", "Angsuran: "),
            m(
              "em",
              format(Math.floor(angsuran)).concat(` (${12 * tenor} bulan)`)
            )
          ])
        ]),
        m("div", { class: "actions".concat(hasResult ? " has-result" : "") }, [
          m(
            "a",
            {
              class: "wa",
              href:
                "https://api.whatsapp.com/send?phone=6281907922588&text=" +
                encodeURIComponent(resultText),
              target: getTarget()
            },
            "Konsultasi via WA"
          )
        ]),
        m("div", { class: "foot" }, [
          m(
            "p",
            "* Perhitungan simulasi ini tidak bersifat aktual dan mengikat dan dapat berbeda berdasarkan perubahan harga dan suku bunga."
          )
        ])
      ])
    ];
  }
};

const rootElement =
  window["simulasiAppContainer"] || document.getElementById("app");
if (rootElement instanceof HTMLElement) {
  m.mount(rootElement, App);
}

/**
 * this script to load the app to attach it to main web https://suzukimataram.id
 */
function simulasiAppLoader(el) {
  if (el && document.getElementById(el) instanceof HTMLElement) {
    let appContainer = document.getElementById(el);
    m.mount(appContainer, App);
  } else {
    // create container
    let appContainer = document.createElement("div");
    appContainer.id = el;
    m.mount(document.getElementById(el), App);
  }
}

window["simulasiAppLoader"] = simulasiAppLoader;

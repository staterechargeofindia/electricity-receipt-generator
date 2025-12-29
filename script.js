
/**************************************
 * TRANSACTION ID AUTO GENERATOR
 * Start from 22649203 (8 digits)
 **************************************/
function generateTransactionId() {
  const START_ID = 22649203;
  let lastId = localStorage.getItem("lastTxnId");

  if (!lastId) {
    lastId = START_ID;
  } else {
    lastId = parseInt(lastId, 10) + 1;
  }

  localStorage.setItem("lastTxnId", lastId);
  return String(lastId); // already 8 digits
}

// Auto-fill Transaction ID on page load
document.getElementById("txnId").value = generateTransactionId();


/**************************************
 * ENGLISH NUMBER TO WORDS (Basic)
 **************************************/
function numberToWords(num) {
  const a = [
    "", "One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
    "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen",
    "Seventeen","Eighteen","Nineteen"
  ];
  const b = [
    "", "", "Twenty","Thirty","Forty","Fifty",
    "Sixty","Seventy","Eighty","Ninety"
  ];

  if (num < 20) return a[num];
  if (num < 100)
    return b[Math.floor(num / 10)] + (num % 10 ? " " + a[num % 10] : "");
  if (num < 1000)
    return a[Math.floor(num / 100)] + " Hundred " + numberToWords(num % 100);

  return num;
}


/**************************************
 * HINDI AMOUNT TO WORDS (RUPEES + PAISE)
 * FULL & CORRECT (Indian System)
 **************************************/
function amountToHindiWords(amount) {

  const hindiNumbers = [
    "", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात", "आठ", "नौ",
    "दस", "ग्यारह", "बारह", "तेरह", "चौदह", "पंद्रह",
    "सोलह", "सत्रह", "अठारह", "उन्नीस",
    "बीस", "इक्कीस", "बाईस", "तेईस", "चौबीस", "पच्चीस",
    "छब्बीस", "सत्ताईस", "अट्ठाईस", "उनतीस",
    "तीस", "इकतीस", "बत्तीस", "तैंतीस", "चौंतीस", "पैंतीस",
    "छत्तीस", "सैंतीस", "अड़तीस", "उनतालीस",
    "चालीस", "इकतालीस", "बयालीस", "तैंतालीस", "चवालीस", "पैंतालीस",
    "छियालीस", "सैंतालीस", "अड़तालीस", "उनचास",
    "पचास", "इक्यावन", "बावन", "तिरेपन", "चौवन", "पचपन",
    "छप्पन", "सत्तावन", "अट्ठावन", "उनसठ",
    "साठ", "इकसठ", "बासठ", "तिरसठ", "चौंसठ", "पैंसठ",
    "छियासठ", "सड़सठ", "अड़सठ", "उनहत्तर",
    "सत्तर", "इकहत्तर", "बहत्तर", "तिहत्तर", "चौहत्तर", "पचहत्तर",
    "छिहत्तर", "सतहत्तर", "अठहत्तर", "उन्यासी",
    "अस्सी", "इक्यासी", "बयासी", "तिरासी", "चौरासी", "पचासी",
    "छियासी", "सत्तासी", "अट्ठासी", "नवासी",
    "नब्बे", "इक्यानवे", "बानवे", "तिरानवे", "चौरानवे", "पचानवे",
    "छियानवे", "सत्तानवे", "अट्ठानवे", "निन्यानवे"
  ];

  function convert(num) {
    let str = "";

    if (num >= 10000000) {
      str += hindiNumbers[Math.floor(num / 10000000)] + " करोड़ ";
      num %= 10000000;
    }
    if (num >= 100000) {
      str += hindiNumbers[Math.floor(num / 100000)] + " लाख ";
      num %= 100000;
    }
    if (num >= 1000) {
      str += hindiNumbers[Math.floor(num / 1000)] + " हज़ार ";
      num %= 1000;
    }
    if (num >= 100) {
      str += hindiNumbers[Math.floor(num / 100)] + " सौ ";
      num %= 100;
    }
    if (num > 0) {
      str += hindiNumbers[num];
    }

    return str.trim();
  }

  let rupees = Math.floor(amount);
  let paise = Math.round((amount - rupees) * 100);

  let result = convert(rupees) + " रुपये";

  if (paise > 0) {
    result += " " + convert(paise) + " पैसे";
  }

  return result + " मात्र";
}


/**************************************
 * FORM SUBMIT – RECEIPT GENERATION
 **************************************/
document.getElementById("receiptForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let amountValue = parseFloat(document.getElementById("amount").value);

  document.getElementById("rReceipt").innerText =
    document.getElementById("receiptNo").value;

  document.getElementById("rTxnId").innerText =
    document.getElementById("txnId").value;

  document.getElementById("rName").innerText =
    document.getElementById("name").value;

  document.getElementById("rAccount").innerText =
    document.getElementById("account").value;

  document.getElementById("rPayment").innerText =
    document.getElementById("paymentType").value;

  document.getElementById("rAmount").innerText =
    amountValue.toFixed(2);

  document.getElementById("rWordsEn").innerText =
    numberToWords(Math.floor(amountValue)) + " Only";

  document.getElementById("rWordsHi").innerText =
    amountToHindiWords(amountValue);

  document.getElementById("rDate").innerText =
    new Date().toLocaleString("hi-IN");

  document.getElementById("receipt").style.display = "block";
});


/**************************************
 * PDF DOWNLOAD
 **************************************/
function downloadPDF() {
  html2pdf()
    .from(document.getElementById("receipt"))
    .save("electricity-receipt.pdf");
}

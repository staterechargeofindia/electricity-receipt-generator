
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
    lastId = parseInt(lastId) + 1;
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
    "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen",
    "Eighteen","Nineteen"
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
 * Indian system (हज़ार, लाख, करोड़)
 **************************************/
function amountToHindiWords(amount) {

  const ones = [
    "", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात", "आठ", "नौ",
    "दस", "ग्यारह", "बारह", "तेरह", "चौदह", "पंद्रह",
    "सोलह", "सत्रह", "अठारह", "उन्नीस"
  ];

  const tens = [
    "", "", "बीस", "तीस", "चालीस", "पचास",
    "साठ", "सत्तर", "अस्सी", "नब्बे"
  ];

  function twoDigit(n) {
    if (n < 20) return ones[n];
    return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
  }

  function numberToHindi(num) {
    let str = "";

    if (num >= 10000000) {
      str += twoDigit(Math.floor(num / 10000000)) + " करोड़ ";
      num %= 10000000;
    }
    if (num >= 100000) {
      str += twoDigit(Math.floor(num / 100000)) + " लाख ";
      num %= 100000;
    }
    if (num >= 1000) {
      str += twoDigit(Math.floor(num / 1000)) + " हज़ार ";
      num %= 1000;
    }
    if (num >= 100) {
      str += ones[Math.floor(num / 100)] + " सौ ";
      num %= 100;
    }
    if (num > 0) {
      str += twoDigit(num);
    }

    return str.trim();
  }

  let rupees = Math.floor(amount);
  let paise = Math.round((amount - rupees) * 100);

  let result = numberToHindi(rupees) + " रुपये";

  if (paise > 0) {
    result += " " + numberToHindi(paise) + " पैसे";
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

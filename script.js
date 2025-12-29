// ===== Transaction ID Generator =====
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

// Auto-fill Transaction ID on load
document.getElementById("txnId").value = generateTransactionId();


// ===== Amount to Words (English basic) =====
function numberToWords(num) {
  const a = [
    "", "One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
    "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen",
    "Eighteen","Nineteen"
  ];
  const b = ["", "", "Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

  if (num < 20) return a[num];
  if (num < 100) return b[Math.floor(num / 10)] + " " + a[num % 10];
  if (num < 1000)
    return a[Math.floor(num / 100)] + " Hundred " + numberToWords(num % 100);

  return num;
}


// ===== Form Submit =====
document.getElementById("receiptForm").addEventListener("submit", function(e){
  e.preventDefault();

  let amount = parseInt(document.getElementById("amount").value);

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

  document.getElementById("rAmount").innerText = amount;

  document.getElementById("rWordsEn").innerText =
    numberToWords(amount) + " Only";

  document.getElementById("rWordsHi").innerText =
    amount + " रुपये मात्र";

  document.getElementById("rDate").innerText =
    new Date().toLocaleString();

  document.getElementById("receipt").style.display = "block";
});


// ===== PDF Download =====
function downloadPDF() {
  html2pdf().from(document.getElementById("receipt")).save("receipt.pdf");
}

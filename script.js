const banks = [
    ['State Bank of India', 'SBIN0000691'],
    ['Au Small Finance Bank Ltd.', 'AUBL0002188'],
    ['Axis Bank Ltd.', 'UTIB0000001'],
    ['Bandhan Bank Ltd.', 'BDBL0000002'],
    ['Bank of Baroda', 'BARB0INDORE'],
    ['Bank of India', 'BKID0006070'],
    ['Bank of Maharashtra', 'MAHB0000001'],
    ['Canara Bank', 'CNRB0001682'],
    ['Capital Small Finance Bank Ltd', 'CSBK0000003'],
    ['Central Bank of India', 'CBIN0280001'],
    ['City Union Bank Ltd.', 'CIUB0000004'],
    ['CSB Bank Limited', 'CSBK0000003'],
    ['DCB Bank Ltd.', 'DCBL0000005'],
    ['Dhanlaxmi Bank Ltd.', 'DLXB0000006'],
    ['Equitas Small Finance Bank Ltd', 'ESAF0001006'],
    ['Federal Bank Ltd.', 'FDRL0000007'],
    ['Fincare Small Finance Bank Ltd.', 'FINO0000001'],
    ['HDFC Bank Ltd', 'HDFC0000008'],
    ['ICICI Bank Ltd.', 'ICIC0000009'],
    ['IDBI Bank Limited', 'IBKL0000001'],
    ['IDFC FIRST Bank Limited', 'IDFB0000011'],
    ['Indian Bank', 'IDIB000N089'],
    ['Indian Overseas Bank', 'IOBA0002387'],
    ['India Post Payments Bank Ltd', 'INDB0000001'],
    ['IndusInd Bank Ltd', 'INDB0000010'],
    ['Jammu & Kashmir Bank Ltd.', 'JAKA0JAMM01'],
    ['Jana Small Finance Bank Ltd', 'JANA0NFB001'],
    ['Jio Payments Bank Ltd', 'JPOB0000001'],
    ['Karnataka Bank Ltd.', 'KARB0000001'],
    ['Karur Vysya Bank Ltd.', 'KVBL0000002'],
    ['Kotak Mahindra Bank Ltd', 'KKBK0000644'],
    ['Nainital Bank Ltd.', 'NTBL0DEL001'],
    ['North East Small finance Bank Ltd', 'NSFB0000001'],
    ['Punjab & Sind Bank', 'PSIB0000002'],
    ['Punjab National Bank', 'PUNB0061100'],
    ['RBL Bank Ltd.', 'RATN0000099'],
    ['Shivalik Small Finance Bank Ltd', 'SSFB0000001'],
    ['South Indian Bank Ltd.', 'SIBL0000453'],
    ['Standard Chartered Bank', 'SCBL0036001'],
    ['State Bank of India', 'SBIN0000691'],
    ['Suryoday Small Finance Bank Ltd.', 'SURY0000001'],
    ['Suryoday Small Finance Bank Ltd.', 'SURY0000001'],
    ['SBM Bank (India) Limited', 'STBP0001200'],
    ['Tamilnad Mercantile Bank Ltd.', 'TMBL0000114'],
    ['Ujjivan Small Finance Bank Ltd.', 'UJVN0003031'],
    ['Utkarsh Small Finance Bank Ltd.', 'UTIB0QDCCB1'],
    ['Union Bank of India', 'UBIN0533654'],
    ['Unity Small Finance Bank Ltd', 'YESB0USB005'],
    ['YES Bank Ltd.', 'YESB0000001'],
  ];
  


function generateQRCode() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const upiId = document.getElementById('upiId').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const acNumber = document.getElementById('acNumber').value.trim();
    const ifsc = document.getElementById('bankSelect').value.trim();
    const acAmount = document.getElementById('acAmount').value.trim();

    if (toggleSwitch.checked) {
        // AC mode selected
        if (!acNumber || !ifsc) {
            alert('Please enter AC number and select a bank.');
            return;
        }

        const acId = `${acNumber}@${ifsc}.ifsc.npci`;
        const qrText = generateUPIQRText(acId, acAmount);
        displayQRCode(qrText);
    } else {
        // VPA mode selected
        if (!upiId) {
            alert('Please enter a valid UPI ID.');
            return;
        }

        const qrText = generateUPIQRText(upiId, amount);
        displayQRCode(qrText);
    }
}

function toggleInputsVisibility() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const upiInputs = document.getElementById('upiInputs');
    const acInputs = document.getElementById('acInputs');

    if (toggleSwitch.checked) {
        // AC mode selected, hide UPI inputs and show AC inputs
        upiInputs.style.display = 'none';
        acInputs.style.display = 'block';
    } else {
        // VPA mode selected, hide AC inputs and show UPI inputs
        upiInputs.style.display = 'block';
        acInputs.style.display = 'none';
    }
}

function generateUPIQRText(upiId, amount) {
    let qrText = 'upi://pay?pa=' + encodeURIComponent(upiId);

    if (amount) {
        qrText += '&mc=yourMerchantCode'; // Replace with your merchant code
        qrText += '&tid=yourTransactionId'; // Replace with your transaction ID
        qrText += '&tr=yourTransactionRefId'; // Replace with your transaction reference ID
        qrText += '&tn=Payment Description';
        qrText += '&am=' + encodeURIComponent(amount);
    }

    return qrText;
}

function displayQRCode(qrText) {
    const resultContainer = document.getElementById('qrcode');
    resultContainer.innerHTML = ''; // Clear previous QR code

    const qrcode = new QRCode(resultContainer, {
        text: qrText,
        width: 300,
        height: 300,
        colorDark: "#6750A4", // Set the dark color to #b1f202
        colorLight: "#fff",   // Set the light color to #fff
    });

    resultContainer.style.display = 'block';
}

// Add this function to your existing JavaScript code
function makePayment() {
    // Retrieve necessary information for payment
    const upiId = document.getElementById('upiId').value;
    const amount = document.getElementById('amount').value;

    // Create UPI payment link
    const paymentLink = `upi://pay?pa=${encodeURIComponent(upiId)}&mc=&tid=&tr=&tn=&am=${amount}&cu=INR&url=`;

    // Open the payment link in a new window or redirect the current window
    window.open(paymentLink, '_blank');
}


// Event listener for toggle switch change
document.getElementById('toggleSwitch').addEventListener('change', toggleInputsVisibility);

// Call toggleInputsVisibility on page load to set initial state
toggleInputsVisibility();

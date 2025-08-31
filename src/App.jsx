import { useState, useEffect, useRef } from 'react'
import { QrCode, Download, CreditCard, ToggleLeft, ToggleRight } from 'lucide-react'
import './App.css'

// Banks data
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
  ['Suryoday Small Finance Bank Ltd.', 'SURY0000001'],
  ['SBM Bank (India) Limited', 'STBP0001200'],
  ['Tamilnad Mercantile Bank Ltd.', 'TMBL0000114'],
  ['Ujjivan Small Finance Bank Ltd.', 'UJVN0003031'],
  ['Utkarsh Small Finance Bank Ltd.', 'UTIB0QDCCB1'],
  ['Union Bank of India', 'UBIN0533654'],
  ['Unity Small Finance Bank Ltd', 'YESB0USB005'],
  ['YES Bank Ltd.', 'YESB0000001'],
];

// Theme colors
const themes = [
  ['#6750A4', '#FFFFFF', '#EADDFF'],
  ['#984061', '#FFFFFF', '#ffd9e2'],
  ['#7e4895', '#FFFFFF', '#f7d8ff'],
  ['#4c57a9', '#FFFFFF', '#dfe0ff'],
  ['#006590', '#FFFFFF', '#c8e6ff'],
  ['#00696c', '#FFFFFF', '#6ff6fb'],
  ['#006d42', '#FFFFFF', '#93f7bb'],
];

function App() {
  const [isAcMode, setIsAcMode] = useState(false)
  const [upiId, setUpiId] = useState('')
  const [amount, setAmount] = useState('')
  const [acNumber, setAcNumber] = useState('')
  const [selectedIfsc, setSelectedIfsc] = useState('')
  const [acAmount, setAcAmount] = useState('')
  const [qrGenerated, setQrGenerated] = useState(false)
  const qrContainerRef = useRef(null)

  // Apply random theme on mount
  useEffect(() => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)]
    changeTheme(randomTheme[0], randomTheme[1], randomTheme[2])
  }, [])

  const changeTheme = (primaryColor, backgroundColor, surfaceColor) => {
    document.documentElement.style.setProperty('--primary-color', primaryColor)
    document.documentElement.style.setProperty('--background-color', backgroundColor)
    document.documentElement.style.setProperty('--surface-color', surfaceColor)
    document.documentElement.style.setProperty('--on-primary-color', '#FFFFFF')
  }

  const generateUPIQRText = (upiId, amount) => {
    let qrText = 'upi://pay?pa=' + encodeURIComponent(upiId)
    qrText += '&tn=' + encodeURIComponent("Paid with UPIQR by Supratim")

    if (amount) {
      qrText += '&mc=yourMerchantCode'
      qrText += '&tid=yourTransactionId'
      qrText += '&tr=yourTransactionRefId'
      qrText += '&am=' + encodeURIComponent(amount)
    }

    return qrText
  }

  const displayQRCode = (qrText) => {
    if (qrContainerRef.current) {
      qrContainerRef.current.innerHTML = '' // Clear previous QR code
      
      // Create QR code using the global QRCode library
      new window.QRCode(qrContainerRef.current, {
        text: qrText,
        width: 300,
        height: 300,
        colorDark: "#000",
        colorLight: "#fff",
      })

      qrContainerRef.current.style.display = 'block'
      setQrGenerated(true)
    }
  }

  const generateQRCode = () => {
    if (isAcMode) {
      // AC mode selected
      if (!acNumber || !selectedIfsc) {
        alert('Please enter AC number and select a bank.')
        return
      }

      const acId = `${acNumber}@${selectedIfsc}.ifsc.npci`
      const qrText = generateUPIQRText(acId, acAmount)
      displayQRCode(qrText)
    } else {
      // VPA mode selected
      if (!upiId) {
        alert('Please enter a valid UPI ID.')
        return
      }

      const qrText = generateUPIQRText(upiId, amount)
      displayQRCode(qrText)
    }
  }

  const downloadQRCode = () => {
    const qrImage = qrContainerRef.current?.querySelector('img')
    
    if (qrImage) {
      const canvas = document.createElement('canvas')
      canvas.width = qrImage.width
      canvas.height = qrImage.height
      const context = canvas.getContext('2d')
      
      context.drawImage(qrImage, 0, 0)
      
      const link = document.createElement('a')
      link.download = 'upi-qr-code.png'
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const makePayment = () => {
    const paymentUpiId = isAcMode ? `${acNumber}@${selectedIfsc}.ifsc.npci` : upiId
    const paymentAmount = isAcMode ? acAmount : amount
    
    if (!paymentUpiId) {
      alert('Please enter payment details.')
      return
    }

    const paymentLink = `upi://pay?pa=${encodeURIComponent(paymentUpiId)}&mc=&tid=&tr=&tn=&am=${paymentAmount}&cu=INR&url=`
    window.open(paymentLink, '_blank')
  }

  return (
    <div className="container">
      <div className="generator">
        <h1>UPI QR Code Generator</h1>

        {/* Toggle Switch */}
        <div className="toggle-container">
          <div className="toggle-labels">
            <span className={!isAcMode ? 'active' : ''}>VPA</span>
            <span className={isAcMode ? 'active' : ''}>AC</span>
          </div>
          <button 
            className="toggle-button"
            onClick={() => setIsAcMode(!isAcMode)}
            aria-label="Toggle between VPA and AC modes"
          >
            {isAcMode ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
          </button>
        </div>

        {/* Input Fields */}
        {!isAcMode ? (
          <div className="input-container">
            <div className="input-group">
              <label htmlFor="upiId">UPI ID / Mobile No</label>
              <input 
                type="text"
                id="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter UPI ID or Mobile No"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="amount">Amount (optional)</label>
              <input 
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                placeholder="Enter amount"
              />
            </div>
          </div>
        ) : (
          <div className="input-container">
            <div className="input-group">
              <label htmlFor="bankSelect">Select Bank</label>
              <select 
                id="bankSelect"
                value={selectedIfsc}
                onChange={(e) => setSelectedIfsc(e.target.value)}
              >
                <option value="">Select a bank</option>
                {banks.map(([bankName, ifsc], index) => (
                  <option key={`${ifsc}-${index}`} value={ifsc}>
                    {bankName}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="acNumber">AC Number</label>
              <input 
                type="text"
                id="acNumber"
                value={acNumber}
                onChange={(e) => setAcNumber(e.target.value)}
                placeholder="Enter AC Number"
              />
            </div>
            <div className="input-group">
              <label htmlFor="acAmount">Amount (optional)</label>
              <input 
                type="number"
                id="acAmount"
                value={acAmount}
                onChange={(e) => setAcAmount(e.target.value)}
                min="0"
                step="0.01"
                placeholder="Enter amount"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="button-container">
          <button className="btn primary" onClick={generateQRCode}>
            <QrCode size={20} />
            Generate QR Code
          </button>
          
          <button className="btn secondary" onClick={makePayment}>
            <CreditCard size={20} />
            Make Payment
          </button>
        </div>

        {/* QR Code Result */}
        <div className="result-area">
          <div ref={qrContainerRef} id="qrcode"></div>
          {qrGenerated && (
            <button className="btn download" onClick={downloadQRCode}>
              <Download size={20} />
              Download QR Code
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="footer">
          <h4>Made with 💙 by Supratim</h4>
        </div>
      </div>
    </div>
  )
}

export default App

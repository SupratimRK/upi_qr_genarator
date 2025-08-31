# UPI QR Code Generator - React Edition

A modern, clean, and responsive UPI QR Code Generator built with React and Vite. This application allows users to generate QR codes for UPI payments using either UPI IDs or bank account details.

## ✨ Features

- **Dual Mode Support**: Toggle between VPA (UPI ID) and AC (Account Number) modes
- **QR Code Generation**: Generate QR codes for UPI payments instantly
- **Download Functionality**: Download generated QR codes as PNG images
- **Direct Payment**: Open UPI apps directly with payment details
- **Modern UI**: Clean, minimal design with Lucide React icons
- **Responsive Design**: Works seamlessly on all devices
- **Random Themes**: Beautiful color themes applied randomly
- **Bank Support**: Comprehensive list of Indian banks with IFSC codes

## 🛠️ Tech Stack

- **React 19**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful SVG icons
- **CSS3**: Modern styling with CSS variables
- **QR Code Library**: Original QR generation functionality preserved

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SupratimRK/upi_qr_genarator.git
   cd upi_qr_genarator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Linting

```bash
npm run lint
```

## 🎨 UI Preview

### VPA Mode
![VPA Mode](https://github.com/user-attachments/assets/aeca282f-1961-456c-956c-de0d746d4a57)

### AC Mode
![AC Mode](https://github.com/user-attachments/assets/f9cab2ac-7fbc-497b-a23e-29bc3ba06513)

### QR Generated
![QR Generated](https://github.com/user-attachments/assets/54737fb4-e50b-4d6a-adb1-9766100ffbb5)

## 🔧 Features in Detail

### VPA Mode
- Enter UPI ID (e.g., user@paytm, user@gpay)
- Optional amount specification
- Generate QR code instantly

### AC Mode
- Select from 45+ supported Indian banks
- Enter account number
- Optional amount specification
- Automatic IFSC code handling

### Additional Features
- **Download QR**: Save QR codes as PNG images
- **Make Payment**: Direct UPI app integration
- **Responsive Design**: Mobile-first approach
- **Theme System**: 7 beautiful color themes

## 🏦 Supported Banks

The application supports 45+ major Indian banks including:
- State Bank of India
- HDFC Bank
- ICICI Bank
- Axis Bank
- Kotak Mahindra Bank
- And many more...

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Supratim Mondal**
- Email: [supratimrk@outlook.com](mailto:supratimrk@outlook.com)
- GitHub: [@SupratimRK](https://github.com/SupratimRK)

---

**Built with ❤️ using React and Vite**

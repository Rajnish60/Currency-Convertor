# 💱 Currency Converter

A beautiful, responsive currency converter web application that provides real-time exchange rates for over 150 currencies worldwide. Built with vanilla HTML, CSS, and JavaScript for optimal performance and simplicity.

![image](https://github.com/user-attachments/assets/acb6ff51-dc70-4ded-b490-ed463115ef6e)

## ✨ Features

- **Real-time Exchange Rates** - Fetches live currency data from ExchangeRate-API
- **150+ Currencies** - Support for all major world currencies
- **Country Flags** - Visual currency identification with flag icons
- **Currency Swap** - Quick swap between source and target currencies
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Real-time Conversion** - Updates conversion as you type
- **Error Handling** - Graceful error handling with user-friendly messages
- **Loading States** - Visual feedback during API calls
- **Auto-refresh** - Rates update automatically every 30 seconds
- **Input Validation** - Prevents invalid input and provides helpful feedback

## 🚀 Live Demo

[View Live Demo](https://exchangehub.netlify.app/)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript** - Clean, dependency-free functionality
- **ExchangeRate-API** - Real-time currency exchange rates
- **FlagsAPI** - Country flag images
- **Font Awesome** - Beautiful icons

## 🏃‍♂️ Quick Start

### Prerequisites

- A modern web browser
- Internet connection (for API calls)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/currency-converter.git
   cd currency-converter
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   python -m http.server 8000  # For local server
   ```

3. **Start converting!**
   - Enter an amount
   - Select source and target currencies
   - Click "Get Exchange Rate" to see the conversion

## 📁 Project Structure

```
currency-converter/
├── index.html          # Main HTML file
├── style.css           # Stylesheet with responsive design
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
```

## 🔧 Configuration

### API Configuration
The app uses ExchangeRate-API for currency data. No API key required for basic usage.

```javascript
// API endpoint used in script.js
const API_URL = 'https://api.exchangerate-api.com/v4/latest/';
```

### Supported Currencies
The application supports 150+ currencies including:
- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)
- JPY (Japanese Yen)
- INR (Indian Rupee)
- And many more...

## 🔄 API Rate Limits

- **ExchangeRate-API Free Tier**: 1,500 requests/month
- **Rate Updates**: Every 24 hours for free tier
- **Upgrade**: Available for higher limits and more frequent updates

## 🙏 Acknowledgments

- [ExchangeRate-API](https://exchangerate-api.com/) for providing free currency data
- [FlagsAPI](https://flagsapi.com/) for country flag images
- [Font Awesome](https://fontawesome.com/) for beautiful icons

## 📞 Support

If you have any questions or need help:

- 📧 Email: rajnishkumarmth12@gmail.com

---

**Made with ❤️ by [Rajnish Kumar](https://github.com/Rajnish60)**

⭐ Star this repository if you found it helpful!

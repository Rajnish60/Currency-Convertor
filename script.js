// Currency list mapping currency codes to country codes
const countryList = {
    AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO", AQD: "AQ", ARS: "AR", AUD: "AU",
    AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", XOF: "BE", BGN: "BG", BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN",
    BOB: "BO", BRL: "BR", BSD: "BS", NOK: "BV", BWP: "BW", BYR: "BY", BZD: "BZ", CAD: "CA", CDF: "CD", XAF: "CF",
    CHF: "CH", CLP: "CL", CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU", CVE: "CV", CYP: "CY", CZK: "CZ", DJF: "DJ",
    DKK: "DK", DOP: "DO", DZD: "DZ", ECS: "EC", EEK: "EE", EGP: "EG", ETB: "ET", EUR: "FR", FJD: "FJ", FKP: "FK",
    GBP: "GB", GEL: "GE", GGP: "GG", GHS: "GH", GIP: "GI", GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK",
    HNL: "HN", HRK: "HR", HTG: "HT", HUF: "HU", IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS",
    JMD: "JM", JOD: "JO", JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KPW: "KP", KRW: "KR", KWD: "KW",
    KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB", LKR: "LK", LRD: "LR", LSL: "LS", LTL: "LT", LVL: "LV", LYD: "LY",
    MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN", MOP: "MO", MRO: "MR", MTL: "MT", MUR: "MU",
    MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ", NAD: "NA", XPF: "NC", NGN: "NG", NIO: "NI", NPR: "NP",
    NZD: "NZ", OMR: "OM", PAB: "PA", PEN: "PE", PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA",
    RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC", SDG: "SD", SEK: "SE", SGD: "SG",
    SKK: "SK", SLL: "SL", SOS: "SO", SRD: "SR", STD: "ST", SVC: "SV", SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ",
    TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR", TTD: "TT", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US",
    UYU: "UY", UZS: "UZ", VEF: "VE", VND: "VN", VUV: "VU", YER: "YE", ZAR: "ZA", ZMK: "ZM", ZWD: "ZW"
};

// DOM elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const fromFlag = document.getElementById('from-flag');
const toFlag = document.getElementById('to-flag');
const swapBtn = document.getElementById('swap-btn');
const convertBtn = document.querySelector('.convert-btn');
const form = document.getElementById('currency-form');
const rateDisplay = document.getElementById('rate-display');
const lastUpdated = document.getElementById('last-updated');
const convertedResult = document.getElementById('converted-result');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const loadingSpinner = document.getElementById('loading-spinner');
const btnText = document.querySelector('.btn-text');
const convertedAmountDiv = document.getElementById('converted-amount');

// Global variables to track state
let currentRate = null;
let isRateFetched = false;

// Populate currency dropdowns
function populateDropdowns() {
    const currencies = Object.keys(countryList).sort();
    
    // Clear existing options except the default ones
    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';
    
    currencies.forEach(currency => {
        // From currency dropdown
        const fromOption = document.createElement('option');
        fromOption.value = currency;
        fromOption.textContent = currency;
        if (currency === 'USD') fromOption.selected = true;
        fromCurrency.appendChild(fromOption);
        
        // To currency dropdown
        const toOption = document.createElement('option');
        toOption.value = currency;
        toOption.textContent = currency;
        if (currency === 'INR') toOption.selected = true;
        toCurrency.appendChild(toOption);
    });
}

// Update flag image
function updateFlag(select, flagElement) {
    const currencyCode = select.value;
    const countryCode = countryList[currencyCode];
    if (countryCode) {
        flagElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
        flagElement.alt = `${currencyCode} flag`;
    }
}

// Format number with commas and appropriate decimal places
function formatNumber(num) {
    if (isNaN(num) || num === null || num === undefined) {
        return '--';
    }
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    }).format(num);
}

// Show error message
function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'flex';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Set loading state
function setLoading(isLoading) {
    if (isLoading) {
        convertBtn.classList.add('loading');
        convertBtn.disabled = true;
        loadingSpinner.style.display = 'inline-block';
        btnText.style.opacity = '0';
    } else {
        convertBtn.classList.remove('loading');
        convertBtn.disabled = false;
        loadingSpinner.style.display = 'none';
        btnText.style.opacity = '1';
    }
}

// Update rate display
function updateRateDisplay() {
    const fromCurr = fromCurrency.value;
    const toCurr = toCurrency.value;
    
    if (currentRate && isRateFetched) {
        rateDisplay.textContent = `1 ${fromCurr} = ${formatNumber(currentRate)} ${toCurr}`;
    } else {
        rateDisplay.textContent = `1 ${fromCurr} = -- ${toCurr}`;
    }
}

// Update converted amount display
function updateConvertedAmount() {
    if (!isRateFetched || !currentRate) {
        return;
    }
    
    const amount = parseFloat(amountInput.value) || 0;
    const convertedAmount = amount * currentRate;
    const toCurr = toCurrency.value;
    
    convertedResult.textContent = `${formatNumber(convertedAmount)} ${toCurr}`;
}

// Get exchange rate and convert
async function updateExchangeRate() {
    const amount = parseFloat(amountInput.value);
    const fromCurr = fromCurrency.value;
    const toCurr = toCurrency.value;
    
    // Validate amount
    if (!amount || amount <= 0) {
        showError('Please enter a valid amount greater than 0');
        return;
    }
    
    // Check if same currency
    if (fromCurr === toCurr) {
        showError('Please select different currencies');
        return;
    }
    
    setLoading(true);
    hideError();
    
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurr}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const rate = data.rates[toCurr];
        
        if (!rate) {
            throw new Error('Currency not supported');
        }
        
        // Update global state
        currentRate = rate;
        isRateFetched = true;
        
        // Update displays
        updateRateDisplay();
        updateConvertedAmount();
        lastUpdated.textContent = `Updated: ${new Date().toLocaleTimeString()}`;
        
        // Show converted amount section
        convertedAmountDiv.style.display = 'block';
        
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        showError('Failed to fetch exchange rate. Please try again.');
        
        // Reset state on error
        currentRate = null;
        isRateFetched = false;
        
        // Update displays
        updateRateDisplay();
        convertedResult.textContent = `-- ${toCurrency.value}`;
        lastUpdated.textContent = 'Update failed';
        
        // Still show converted amount section even on error
        convertedAmountDiv.style.display = 'block';
    } finally {
        setLoading(false);
    }
}

// Real-time conversion as user types
function handleAmountChange() {
    const value = amountInput.value;
    
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
        // If there's a current rate and converted amount is visible, update conversion immediately
        if (isRateFetched && convertedAmountDiv.style.display === 'block') {
            updateConvertedAmount();
        }
    } else {
        // Remove invalid characters
        amountInput.value = value.replace(/[^\d.]/g, '');
    }
}

// Swap currencies
function swapCurrencies() {
    const fromValue = fromCurrency.value;
    const toValue = toCurrency.value;
    
    // Swap values
    fromCurrency.value = toValue;
    toCurrency.value = fromValue;
    
    // Update flags
    updateFlag(fromCurrency, fromFlag);
    updateFlag(toCurrency, toFlag);
    
    // Reset rate state since currencies changed
    currentRate = null;
    isRateFetched = false;
    
    // Update rate display
    updateRateDisplay();
    
    // Hide converted amount until new rate is fetched
    convertedAmountDiv.style.display = 'none';
    lastUpdated.textContent = '';
}

// Handle currency change
function handleCurrencyChange() {
    // Reset rate state since currencies changed
    currentRate = null;
    isRateFetched = false;
    
    // Update rate display
    updateRateDisplay();
    
    // Hide converted amount until new rate is fetched
    convertedAmountDiv.style.display = 'none';
    lastUpdated.textContent = '';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    populateDropdowns();
    updateFlag(fromCurrency, fromFlag);
    updateFlag(toCurrency, toFlag);
    updateRateDisplay(); // Initialize rate display
});

fromCurrency.addEventListener('change', function() {
    updateFlag(this, fromFlag);
    handleCurrencyChange();
});

toCurrency.addEventListener('change', function() {
    updateFlag(this, toFlag);
    handleCurrencyChange();
});

amountInput.addEventListener('input', handleAmountChange);
swapBtn.addEventListener('click', swapCurrencies);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    updateExchangeRate();
});
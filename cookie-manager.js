document.addEventListener('DOMContentLoaded', function() {
    let cookieBanner = document.getElementById('cookieBanner');
    let acceptCookiesBtn = document.getElementById('acceptCookies');
    let rejectCookiesBtn = document.getElementById('rejectCookies');

    checkAndApplyCookiePreferences();

    if (!cookieBanner) {
        cookieBanner = document.createElement('div');
        cookieBanner.id = 'cookieBanner';
        cookieBanner.className = 'cookie-banner';
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <p>We use cookies to improve your experience on our site. With Chrome's new third-party cookie policy, some features may be limited.</p>
                <div class="cookie-buttons">
                    <button id="acceptCookies" class="primary-button">Accept</button>
                    <button id="rejectCookies" class="secondary-button">Reject</button>
                    <a href="#" id="customizeCookies" class="cookie-link">CUSTOMIZE</a>
                </div>
            </div>
        `;
        document.body.appendChild(cookieBanner);

        acceptCookiesBtn = document.getElementById('acceptCookies');
        rejectCookiesBtn = document.getElementById('rejectCookies');
    }

    if (cookieBanner && acceptCookiesBtn && rejectCookiesBtn) {
        if (!localStorage.getItem('cookieChoice')) {
            cookieBanner.style.display = 'block';
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 100);
        } else {
            cookieBanner.style.display = 'none';
        }
        
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookieChoice', 'accepted');
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300); 
            enableThirdPartyCookies();
        });
        
        rejectCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookieChoice', 'rejected');
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300); 
            disableThirdPartyCookies();
        });
    
        const customizeBtn = document.getElementById('customizeCookies');
        if (customizeBtn) {
            customizeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showCookieCustomizationPanel();
            });
        }
    }
});

function checkAndApplyCookiePreferences() {
    const cookieChoice = localStorage.getItem('cookieChoice');
    
    if (cookieChoice === 'accepted') {
        enableThirdPartyCookies();
    } else if (cookieChoice === 'rejected') {
        disableThirdPartyCookies();
    } else if (cookieChoice === 'customized') {
        applyCookiePreferences();
    }
    logCookieSettings();
}

function logCookieSettings() {
    const cookieChoice = localStorage.getItem('cookieChoice');
    const analyticsEnabled = localStorage.getItem('analyticsCookies') === 'true';
    const marketingEnabled = localStorage.getItem('marketingCookies') === 'true';
    const preferencesEnabled = localStorage.getItem('preferencesCookies') === 'true';
    
    console.log('Current cookie settings:');
    console.log('- Cookie choice:', cookieChoice);
    console.log('- Analytics cookies:', analyticsEnabled);
    console.log('- Marketing cookies:', marketingEnabled);
    console.log('- Preferences cookies:', preferencesEnabled);
}

function showCookieCustomizationPanel() {
    let customizationPanel = document.getElementById('cookieCustomizationPanel');
    
    if (!customizationPanel) {
        customizationPanel = document.createElement('div');
        customizationPanel.id = 'cookieCustomizationPanel';
        customizationPanel.className = 'cookie-customization-panel';
        customizationPanel.innerHTML = `
            <div class="cookie-customization-content">
                <h2>Customize Your Cookies</h2>
                <p>Select which types of cookies you want to accept:</p>
                
                <div class="cookie-option">
                    <div class="cookie-option-header">
                        <label class="cookie-switch">
                            <input type="checkbox" id="essentialCookies" checked disabled>
                            <span class="cookie-slider"></span>
                        </label>
                        <div class="cookie-option-title">
                            <h3>Essential Cookies</h3>
                            <p>Necessary for the website to function. Cannot be disabled.</p>
                        </div>
                    </div>
                </div>
                
                <div class="cookie-option">
                    <div class="cookie-option-header">
                        <label class="cookie-switch">
                            <input type="checkbox" id="analyticsCookies">
                            <span class="cookie-slider"></span>
                        </label>
                        <div class="cookie-option-title">
                            <h3>Analytics Cookies</h3>
                            <p>Help us understand how users interact with our website.</p>
                        </div>
                    </div>
                </div>
                
                <div class="cookie-option">
                    <div class="cookie-option-header">
                        <label class="cookie-switch">
                            <input type="checkbox" id="marketingCookies">
                            <span class="cookie-slider"></span>
                        </label>
                        <div class="cookie-option-title">
                            <h3>Marketing Cookies</h3>
                            <p>Used to show you relevant advertisements.</p>
                        </div>
                    </div>
                </div>
                
                <div class="cookie-option">
                    <div class="cookie-option-header">
                        <label class="cookie-switch">
                            <input type="checkbox" id="preferencesCookies">
                            <span class="cookie-slider"></span>
                        </label>
                        <div class="cookie-option-title">
                            <h3>Preference Cookies</h3>
                            <p>Store your preferences to improve your experience.</p>
                        </div>
                    </div>
                </div>
                
                <div class="cookie-customization-buttons">
                    <button id="saveCookiePreferences" class="primary-button">Save Preferences</button>
                    <button id="acceptAllCookies" class="secondary-button">Accept All</button>
                    <button id="rejectAllCookies" class="secondary-button">Reject All</button>
                </div>
            </div>
        `;
        document.body.appendChild(customizationPanel);
        
        document.getElementById('saveCookiePreferences').addEventListener('click', saveCookiePreferences);
        document.getElementById('acceptAllCookies').addEventListener('click', acceptAllCookies);
        document.getElementById('rejectAllCookies').addEventListener('click', rejectAllCookies);
        document.getElementById('analyticsCookies').addEventListener('change', updateCookiePreferences);
        document.getElementById('marketingCookies').addEventListener('change', updateCookiePreferences);
        document.getElementById('preferencesCookies').addEventListener('change', updateCookiePreferences);
    }
    const analyticsEnabled = localStorage.getItem('analyticsCookies') === 'true';
    const marketingEnabled = localStorage.getItem('marketingCookies') === 'true';
    const preferencesEnabled = localStorage.getItem('preferencesCookies') === 'true';
    
    document.getElementById('analyticsCookies').checked = analyticsEnabled;
    document.getElementById('marketingCookies').checked = marketingEnabled;
    document.getElementById('preferencesCookies').checked = preferencesEnabled;
    customizationPanel.classList.add('show');
}
function saveCookiePreferences() {
    const analyticsEnabled = document.getElementById('analyticsCookies').checked;
    const marketingEnabled = document.getElementById('marketingCookies').checked;
    const preferencesEnabled = document.getElementById('preferencesCookies').checked;
    localStorage.setItem('cookieChoice', 'customized');
    localStorage.setItem('analyticsCookies', analyticsEnabled);
    localStorage.setItem('marketingCookies', marketingEnabled);
    localStorage.setItem('preferencesCookies', preferencesEnabled);
    
    applyCookiePreferences();
    
    document.getElementById('cookieCustomizationPanel').classList.remove('show');
    
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
        cookieBanner.classList.remove('show');
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 300);
    }
    showCookieConfirmation('Your cookie preferences have been saved');
}

function showCookieConfirmation(message) {
    let confirmationElement = document.getElementById('cookieConfirmation');
    if (!confirmationElement) {
        confirmationElement = document.createElement('div');
        confirmationElement.id = 'cookieConfirmation';
        confirmationElement.className = 'cookie-confirmation';
        document.body.appendChild(confirmationElement);
    }
    confirmationElement.textContent = message;
    confirmationElement.classList.add('show');
    setTimeout(() => {
        confirmationElement.classList.remove('show');
    }, 3000);
}

function acceptAllCookies() {
    document.getElementById('analyticsCookies').checked = true;
    document.getElementById('marketingCookies').checked = true;
    document.getElementById('preferencesCookies').checked = true;
    
    saveCookiePreferences();
}
function rejectAllCookies() {
    document.getElementById('analyticsCookies').checked = false;
    document.getElementById('marketingCookies').checked = false;
    document.getElementById('preferencesCookies').checked = false;
    
    saveCookiePreferences();
}
function updateCookiePreferences() {
    console.log('Cookie preferences updated');
}
function applyCookiePreferences() {
    const analyticsEnabled = localStorage.getItem('analyticsCookies') === 'true';
    const marketingEnabled = localStorage.getItem('marketingCookies') === 'true';
    const preferencesEnabled = localStorage.getItem('preferencesCookies') === 'true';
    
    if (analyticsEnabled) {
        enableAnalyticsCookies();
    } else {
        disableAnalyticsCookies();
    }
    
    if (marketingEnabled) {
        enableMarketingCookies();
    } else {
        disableMarketingCookies();
    }
    
    if (preferencesEnabled) {
        enablePreferencesCookies();
    } else {
        disablePreferencesCookies();
    }
    logCookieSettings();
}
function enableThirdPartyCookies() {
    enableAnalyticsCookies();
    enableMarketingCookies();
    enablePreferencesCookies();
}
function disableThirdPartyCookies() {
    disableAnalyticsCookies();
    disableMarketingCookies();
    disablePreferencesCookies();
}
function enableAnalyticsCookies() {
    if (typeof analytics !== 'undefined') {
        analytics.setAnalyticsCollectionEnabled(true);
    }
    console.log('Analytics cookies enabled');
}

function disableAnalyticsCookies() {
    if (typeof analytics !== 'undefined') {
        analytics.setAnalyticsCollectionEnabled(false);
    }
    console.log('Analytics cookies disabled');
}

function enableMarketingCookies() {
    console.log('Marketing cookies enabled');
}

function disableMarketingCookies() {
    console.log('Marketing cookies disabled');
}

function enablePreferencesCookies() {
    console.log('Preferences cookies enabled');
}

function disablePreferencesCookies() {
    console.log('Preferences cookies disabled');
} 
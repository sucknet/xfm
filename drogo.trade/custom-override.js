// Custom override - Buat Token Information baru yang estetis
(function() {
    'use strict';
    
    let lastUrl = location.href;
    const CONTRACT_ADDRESS = 'XFLm5L3SXHJ26YDiiHLLCEANGpTG5afatWLMPMG5Ypv';
    const BURNED_LP_LINK = 'https://explorer.mainnet.x1.xyz/tx/N2xNJ9rLoF32Bne8f2s9rkzsxCFRHRQ1oiPjLbKCmzZeH3aqAM1bfZuDPPXeH93bQHKXUkkRFj1UJRSSsnzCksy';
    const BUY_LINK = 'https://app.xdex.xyz/swap';
    
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            const notification = document.createElement('div');
            notification.textContent = '✅ Copied to clipboard!';
            notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; font-weight: bold; z-index: 99999; box-shadow: 0 4px 12px rgba(0,0,0,0.3); animation: slideIn 0.3s ease-out;';
            document.body.appendChild(notification);
            setTimeout(function() {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(function() { notification.remove(); }, 300);
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy:', err);
        });
    }
    
    function replaceTokenSections() {
        // Reset flag jika URL berubah (navigasi antar halaman)
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
        }
        
        const allElements = document.querySelectorAll('*');
        
        for (const el of allElements) {
            const textContent = el.textContent || '';
            
                if ((textContent.includes('Token Information') || textContent.includes('Token Preview')) &&
                (textContent.includes('Define the basic') || textContent.includes('Live preview'))) {
                
                let container = el;
                let attempts = 0;
                
                while (container && attempts < 15) {
                    const className = container.className || '';
                    
                    if (className.includes('grid') && className.includes('gap')) {
                        // Check jika sudah pernah di-replace
                        if (container.hasAttribute('data-xflm-replaced')) {
                            return true;
                        }
                        
                        // Mark sebagai sudah replaced
                        container.setAttribute('data-xflm-replaced', 'true');
                        
                        // Hapus konten lama
                        container.innerHTML = '';
                        container.className = 'max-w-lg mx-auto px-4 py-8';
                        
                        // Card utama - Simple
                        const card = document.createElement('div');
                        card.className = 'bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden';
                        
                        // Content wrapper
                        const content = document.createElement('div');
                        content.className = 'p-6 space-y-4';
                        
                        // Header: Logo kecil + XFlames (horizontal)
                        const header = document.createElement('div');
                        header.className = 'flex items-center gap-3 mb-6';
                        
                        const logo = document.createElement('img');
                        logo.src = '/fogo.png';
                        logo.alt = 'XFlames';
                        logo.className = 'size-10 rounded-full object-cover';
                        
                        const nameWrapper = document.createElement('div');
                        
                        const tokenName = document.createElement('h2');
                        tokenName.textContent = 'XFlames';
                        tokenName.className = 'text-2xl font-semibold text-foreground';
                        
                        const ticker = document.createElement('div');
                        ticker.textContent = 'XFLM';
                        ticker.className = 'text-sm text-muted-foreground font-medium';
                        
                        nameWrapper.appendChild(tokenName);
                        nameWrapper.appendChild(ticker);
                        header.appendChild(logo);
                        header.appendChild(nameWrapper);
                        content.appendChild(header);
                        
                        // Supply
                        const supplyRow = document.createElement('div');
                        supplyRow.className = 'flex justify-between items-center py-3 border-b border-border/40';
                        
                        const supplyLabel = document.createElement('span');
                        supplyLabel.textContent = 'Supply';
                        supplyLabel.className = 'text-sm text-muted-foreground';
                        
                        const supplyValue = document.createElement('span');
                        supplyValue.textContent = '10,000';
                        supplyValue.className = 'text-sm font-semibold text-foreground';
                        
                        supplyRow.appendChild(supplyLabel);
                        supplyRow.appendChild(supplyValue);
                        content.appendChild(supplyRow);
                        
                        // CA (Contract Address) - Clickable untuk copy
                        const caRow = document.createElement('div');
                        caRow.className = 'py-3 border-b border-border/40';
                        
                        const caLabel = document.createElement('div');
                        caLabel.textContent = 'CA';
                        caLabel.className = 'text-sm text-muted-foreground mb-2';
                        
                        const caBox = document.createElement('div');
                        caBox.className = 'bg-muted/20 border border-border/50 rounded-lg p-2.5 cursor-pointer hover:border-primary/50 hover:bg-muted/40 transition-all group flex items-center justify-between';
                        caBox.onclick = function() {
                            copyToClipboard(CONTRACT_ADDRESS);
                        };
                        
                        const caText = document.createElement('code');
                        caText.textContent = CONTRACT_ADDRESS;
                        caText.className = 'text-xs font-mono text-foreground/70 flex-1';
                        
                        const copyIcon = document.createElement('span');
                        copyIcon.textContent = '📋';
                        copyIcon.className = 'text-base opacity-50 group-hover:opacity-100 transition-opacity ml-2';
                        
                        caBox.appendChild(caText);
                        caBox.appendChild(copyIcon);
                        caRow.appendChild(caLabel);
                        caRow.appendChild(caBox);
                        content.appendChild(caRow);
                        
                        // Burned LP
                        const burnedLPRow = document.createElement('div');
                        burnedLPRow.className = 'py-3 border-b border-border/40';
                        
                        const burnedLPLabel = document.createElement('div');
                        burnedLPLabel.textContent = 'Burned LP';
                        burnedLPLabel.className = 'text-sm text-muted-foreground mb-2';
                        
                        const burnedLPContent = document.createElement('div');
                        burnedLPContent.className = 'flex items-center justify-between';
                        
                        const burnedLPLink = document.createElement('a');
                        burnedLPLink.href = BURNED_LP_LINK;
                        burnedLPLink.target = '_blank';
                        burnedLPLink.rel = 'noopener noreferrer';
                        burnedLPLink.textContent = '🔥 View on Explorer';
                        burnedLPLink.className = 'text-sm text-orange-400 hover:text-orange-300 underline underline-offset-2 inline-flex items-center gap-1 transition-colors';
                        
                        const burnedPercentage = document.createElement('span');
                        burnedPercentage.textContent = '100%';
                        burnedPercentage.className = 'text-sm font-semibold text-orange-400';
                        
                        burnedLPContent.appendChild(burnedLPLink);
                        burnedLPContent.appendChild(burnedPercentage);
                        
                        burnedLPRow.appendChild(burnedLPLabel);
                        burnedLPRow.appendChild(burnedLPContent);
                        content.appendChild(burnedLPRow);
                        
                        // BUY Button
                        const buyButton = document.createElement('a');
                        buyButton.href = BUY_LINK;
                        buyButton.target = '_blank';
                        buyButton.rel = 'noopener noreferrer';
                        buyButton.textContent = 'Buy XFLM';
                        buyButton.className = 'block w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-base font-semibold rounded-lg transition-all hover:shadow-lg text-center mt-6';
                        buyButton.style.cursor = 'pointer';
                        content.appendChild(buyButton);
                        
                        // Tambahkan semua ke card
                        card.appendChild(content);
                        container.appendChild(card);
                        
                        console.log('✅ Token Information baru yang estetis telah dibuat!');
                        return true;
                    }
                    
                    container = container.parentElement;
                    attempts++;
                }
            }
        }
        
        return false;
    }
    
    // Observer untuk detect DOM changes
    const observer = new MutationObserver(function(mutations) {
        replaceTokenSections();
    });
    
    function startObserving() {
        const targetNode = document.getElementById('root') || document.body;
        observer.observe(targetNode, {
            childList: true,
            subtree: true
        });
        
        replaceTokenSections();
    }
    
    // Monitor URL changes (untuk detect navigasi SPA)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function() {
        originalPushState.apply(this, arguments);
        setTimeout(replaceTokenSections, 100);
        setTimeout(replaceTokenSections, 500);
        setTimeout(replaceTokenSections, 1000);
    };
    
    history.replaceState = function() {
        originalReplaceState.apply(this, arguments);
        setTimeout(replaceTokenSections, 100);
        setTimeout(replaceTokenSections, 500);
        setTimeout(replaceTokenSections, 1000);
    };
    
    window.addEventListener('popstate', function() {
        setTimeout(replaceTokenSections, 100);
        setTimeout(replaceTokenSections, 500);
        setTimeout(replaceTokenSections, 1000);
    });
    
    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startObserving);
    } else {
        startObserving();
    }
    
    // Periodic check setiap 2 detik untuk memastikan
    setInterval(replaceTokenSections, 2000);
    
})();


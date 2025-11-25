console.log("%cTwitch Auto Bonus loaded", "color:#0f0;font-weight:bold");

function isEnabled() {
    return new Promise(resolve => {
        chrome.storage.sync.get(["enabled"], data =>
            resolve(data.enabled ?? true)
        );
    });
}

function getBonusButton() {
    let btn = document.querySelector('button[aria-label="Получить бонус"]');
    if (btn) return btn;

    btn = document.querySelector('button[aria-label*="бонус" i]');
    if (btn) return btn;

    const icon = document.querySelector('.claimable-bonus__icon');
    if (icon) return icon.closest("button");

    return null;
}

const observer = new MutationObserver(async () => {
    if (!await isEnabled()) return;

    const btn = getBonusButton();
    if (btn) {
        console.log("%c[BONUS] Claimed!", "color:#00ff87;font-weight:bold");
        btn.click();
    }
});

observer.observe(document.body, { childList: true, subtree: true });

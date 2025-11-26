function findBonusButton() {
    const icon = document.querySelector(".claimable-bonus__icon");
    if (!icon) return null;

    const btn = icon.closest("button");
    if (!btn) return null;

    const label = btn.getAttribute("aria-label") || "";
    if (!label.includes("бонус")) return null;

    return btn;
}

function clickBonus() {
    const btn = findBonusButton();
    if (btn) {
        console.log("[Twitch Bonus] Clicked bonus button");
        btn.click();
    }
}

const observer = new MutationObserver(() => {
    clickBonus();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

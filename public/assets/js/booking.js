
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll("[data-booking-tab]");
    const panels = document.querySelectorAll(".booking-panel");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const selectedType = tab.dataset.bookingTab;

            tabs.forEach((item) => {
                const isActive = item === tab;
                item.classList.toggle("active", isActive);
                item.setAttribute("aria-selected", String(isActive));
            });

            panels.forEach((panel) => {
                panel.hidden = panel.id !== `panel-${selectedType}`;
            });
        });
    });
});

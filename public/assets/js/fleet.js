function initializeFleetCarousel() {
    const section = document.querySelector("#fleet");
    if (!section || section.dataset.fleetInitialized === "true") return;

    const viewport = section.querySelector(".fleet-viewport");
    const track = section.querySelector("[data-fleet-track]");
    const previousButton = section.querySelector("[data-fleet-prev]");
    const nextButton = section.querySelector("[data-fleet-next]");

    if (!viewport || !track) {
        console.error("Fleet carousel elements not found.");
        return;
    }

    const originalCards = Array.from(track.children).filter(function (card) {
        return card.classList.contains("fleet-card") &&
            !card.hasAttribute("data-fleet-clone");
    });

    if (originalCards.length !== 6) {
        console.warn(
            "Fleet carousel: expected 6 original cards, found " +
            originalCards.length
        );
    }

    if (originalCards.length < 2) return;

    section.dataset.fleetInitialized = "true";

    track.querySelectorAll("[data-fleet-clone]").forEach(function (clone) {
        clone.remove();
    });

    function createClones() {
        return originalCards.map(function (card) {
            const clone = card.cloneNode(true);
            clone.setAttribute("data-fleet-clone", "true");
            clone.setAttribute("aria-hidden", "true");
            return clone;
        });
    }

    const leadingClones = createClones();
    const leadingFragment = document.createDocumentFragment();
    leadingClones.forEach(function (clone) {
        leadingFragment.appendChild(clone);
    });
    track.insertBefore(leadingFragment, track.firstChild);

    createClones().forEach(function (clone) {
        track.appendChild(clone);
    });

    const cards = Array.from(track.querySelectorAll(".fleet-card"));
    const motionPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );
    const speed = 38;
    const manualDuration = 0.42;
    let position = 0;
    let loopWidth = 0;
    let lastTimestamp = 0;
    let manualMotion = null;

    function getGap() {
        const style = window.getComputedStyle(track);
        return parseFloat(style.columnGap) || parseFloat(style.gap) || 0;
    }

    function getLoopWidth() {
        const gap = getGap();
        return originalCards.reduce(function (total, card) {
            return total + card.offsetWidth + gap;
        }, 0);
    }

    function normalizePosition() {
        if (!loopWidth) return;

        while (position < loopWidth) position += loopWidth;
        while (position >= loopWidth * 2) position -= loopWidth;
    }

    function updateCenterCard() {
        const cardWidth = cards[0].offsetWidth;
        const cardStep = cardWidth + getGap();
        const trackCenter = position + viewport.clientWidth / 2;
        const nearestIndex = Math.round(
            (trackCenter - cardWidth / 2) / cardStep
        );

        cards.forEach(function (card, index) {
            card.classList.toggle("is-center", index === nearestIndex);
        });
    }

    function render() {
        track.style.transform =
            "translate3d(" + (-position) + "px, 0, 0)";
        updateCenterCard();
    }

    function moveByCard(direction) {
        const distance = originalCards[0].offsetWidth + getGap();

        if (motionPreference.matches) {
            position += direction * distance;
            normalizePosition();
            render();
            lastTimestamp = 0;
            return;
        }

        const destination = manualMotion
            ? manualMotion.to + direction * distance
            : position + direction * distance;

        manualMotion = {
            from: position,
            to: destination,
            elapsed: 0
        };
        lastTimestamp = 0;
    }

    function animate(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;

        const elapsed = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
        lastTimestamp = timestamp;

        if (loopWidth > 0) {
            if (manualMotion) {
                manualMotion.elapsed += elapsed;
                const progress = Math.min(
                    manualMotion.elapsed / manualDuration,
                    1
                );
                const easedProgress = 1 - Math.pow(1 - progress, 3);

                position = manualMotion.from +
                    (manualMotion.to - manualMotion.from) * easedProgress;

                if (progress === 1) {
                    position = manualMotion.to;
                    normalizePosition();
                    manualMotion = null;
                }
            } else if (!motionPreference.matches) {
                position += speed * elapsed;

                if (position >= loopWidth * 2) {
                    position -= loopWidth;
                }
            }

            render();
        }

        requestAnimationFrame(animate);
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            moveByCard(1);
        });
    }

    if (previousButton) {
        previousButton.addEventListener("click", function () {
            moveByCard(-1);
        });
    }

    function handleMotionPreferenceChange() {
        if (motionPreference.matches && manualMotion) {
            position = manualMotion.to;
            normalizePosition();
            manualMotion = null;
            render();
        }

        lastTimestamp = 0;
    }

    if (motionPreference.addEventListener) {
        motionPreference.addEventListener(
            "change",
            handleMotionPreferenceChange
        );
    } else {
        motionPreference.addListener(handleMotionPreferenceChange);
    }

    window.addEventListener("resize", function () {
        loopWidth = getLoopWidth();
        manualMotion = null;
        normalizePosition();
        render();
        lastTimestamp = 0;
    });

    loopWidth = getLoopWidth();
    position = loopWidth;
    render();
    requestAnimationFrame(animate);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeFleetCarousel, {
        once: true
    });
} else {
    initializeFleetCarousel();
}

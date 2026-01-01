function initChatbot() {
    if (window.__chatbotInitialized) return;
    window.__chatbotInitialized = true;

    const launcher = document.getElementById("chatbot-launcher");
    const widget = document.getElementById("chatbot-widget");
    const closeBtn = document.getElementById("chatbot-close");
    const greeting = document.getElementById("chatbot-greeting");
    console.log("Chatbot initialized");

    if (!launcher || !widget) {
        console.warn("Chatbot elements not found");
        return;
    }

    const popupSound = new Audio("chatbot/pop-up.mp3");

    // Greeting (once per session)
    if (!sessionStorage.getItem("chatbotGreeted")) {
        setTimeout(() => {
            greeting?.classList.remove("hidden");
        }, 1500);
    }

    launcher.addEventListener("click", () => {
        widget.classList.remove("hidden");
        greeting?.classList.add("hidden");
        sessionStorage.setItem("chatbotGreeted", "true");

        popupSound.currentTime = 0;
        popupSound.play().catch(() => {
            console.warn("Popup sound blocked by browser");
        });
    });

    closeBtn?.addEventListener("click", () => {
        widget.classList.add("hidden");
    });
}

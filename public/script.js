document.addEventListener("DOMContentLoaded", function(event) {
    const copyButton = document.querySelector(".copy-button");

    if (copyButton) {
        copyButton.addEventListener('click', (e) => {
            const short_link = document.querySelector(".short-link").href;
            navigator.clipboard.writeText(short_link);
            copyButton.innerHTML = "Copied!";
        });
    }
});
{
    const appContent = document.getElementById("app-content");
    const languageSelect = document.getElementById("language-select");
    const loadingText = document.getElementById("loading-text");
    const generateButton = document.getElementById("generate-button");

    var key = 0;

    async function startGacha() {
        appContent.innerHTML = ""; // Clear previous articles
        loadingText.innerHTML = "読み込み中……";
        key++;
        const currentKey = key;
        const language = languageSelect.value.split("/")[1];

        for (let i = 0; i < 10; i++) {
            try {
                const response = await fetch(`https://${language}.wikipedia.org/api/rest_v1/page/random/summary`);
                const data = await response.json();

                const articleDiv = document.createElement("div");
                articleDiv.className = "article";

                const imgHtml = data.thumbnail
                    ? `<div class="thumbnail-div"><img class="thumbnail" src="${data.thumbnail.source}" alt="${data.title}"></div>`
                    : `<div class="thumbnail-div"><img class="thumbnail" src="res/NoImage.png"></div>`;

                articleDiv.innerHTML = `
                    ${imgHtml}
                    <h2>${data.title}</h2>
                    <p>${data.extract}</p>
                    <a href="${data.content_urls.desktop.page}" target="_blank">記事を読む</a>
                `;

                if (key != currentKey) {
                    break;
                }

                appContent.appendChild(articleDiv);

            } catch (err) {
                console.error(err);
                const errorDiv = document.createElement("div");
                errorDiv.className = "article";
                errorDiv.innerHTML = `読み込み失敗<br>${err}`;
                appContent.appendChild(errorDiv);
            }
        }
        loadingText.innerHTML = "読み込み完了";
    };

    generateButton.addEventListener("click", startGacha);
}

/* ============================= */
/* Elements */
/* ============================= */

const searchInput = document.getElementById("searchInput");
const resultsBody = document.getElementById("resultsBody");
const dictionaryBody = document.getElementById("dictionaryBody");
const resultsSection = document.getElementById("resultsSection");
const noResults = document.getElementById("noResults");

const resultCount = document.getElementById("resultCount");
const footerCount = document.getElementById("footerCount");

const clearButton = document.getElementById("clearButton");

const dictionaryTab = document.getElementById("dictionaryTab");
const flashcardTab = document.getElementById("flashcardTab");

const dictionaryMode = document.getElementById("dictionaryMode");
const flashcardMode = document.getElementById("flashcardMode");

const flashcard = document.getElementById("flashcard");

const flashFront = document.getElementById("flashFront");
const flashBack = document.getElementById("flashBack");

const prevCard = document.getElementById("prevCard");
const nextCard = document.getElementById("nextCard");
const flipCard = document.getElementById("flipCard");

const cardCounter = document.getElementById("cardCounter");

const topButton = document.getElementById("topButton");

/* ============================= */
/* State */
/* ============================= */

let index = 0;

/* ============================= */
/* Init */
/* ============================= */

function init() {

    buildGroupedDictionary();

    footerCount.textContent = `Total terms: ${wineTerms.length}`;

    resultsSection.style.display = "none";

    loadCard();

}

init();

/* ============================= */
/* Table Builder */
/* ============================= */

function buildTable(data, container) {

    container.innerHTML = "";

    data.forEach(t => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${t.english}</td>
            <td>${t.spanish}</td>
            <td>${t.french}</td>
        `;

        container.appendChild(row);

    });

}

function buildGroupedDictionary() {

    dictionaryBody.innerHTML = "";

    const categories = [
        ...new Set(wineTerms.map(t => t.category))
    ];

    categories.forEach(category => {

        const section = document.createElement("div");

        section.className = "categorySection";

        const terms = wineTerms.filter(
            t => t.category === category
        );

        section.innerHTML = `
            <h3 class="categoryHeading">${category}</h3>

            <table>

                <thead>
                    <tr>
                        <th>English</th>
                        <th>Spanish</th>
                        <th>French</th>
                    </tr>
                </thead>

                <tbody>
                    ${terms.map(t => `
                        <tr>
                            <td>${t.english}</td>
                            <td>${t.spanish}</td>
                            <td>${t.french}</td>
                        </tr>
                    `).join("")}
                </tbody>

            </table>
        `;

        dictionaryBody.appendChild(section);

    });

}

/* ============================= */
/* Search */
/* ============================= */

searchInput.addEventListener("input", () => {

    const q = searchInput.value.toLowerCase();

    if (!q) {

        resultsSection.style.display = "none";
        resultCount.textContent = "";
        return;

    }

    const matches = wineTerms.filter(t =>
        t.english.toLowerCase().includes(q) ||
        t.spanish.toLowerCase().includes(q) ||
        t.french.toLowerCase().includes(q)
    );

    resultsSection.style.display = "block";

    resultCount.textContent = `${matches.length} results`;

    if (!matches.length) {

        resultsBody.innerHTML = "";
        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";
        buildTable(matches, resultsBody);

    }

});

/* ============================= */
/* Clear */
/* ============================= */

clearButton.addEventListener("click", () => {

    searchInput.value = "";
    resultsSection.style.display = "none";
    resultCount.textContent = "";

});

/* ============================= */
/* Tabs */
/* ============================= */

dictionaryTab.onclick = () => {

    dictionaryMode.style.display = "block";
    flashcardMode.style.display = "none";

    dictionaryTab.classList.add("activeTab");
    flashcardTab.classList.remove("activeTab");

};

flashcardTab.onclick = () => {

    dictionaryMode.style.display = "none";
    flashcardMode.style.display = "block";

    flashcardTab.classList.add("activeTab");
    dictionaryTab.classList.remove("activeTab");

    loadCard();

};

/* ============================= */
/* Flashcards */
/* ============================= */

function loadCard() {

    const t = wineTerms[index];

    flashFront.innerHTML = `<h2>${t.english}</h2>`;

    flashBack.innerHTML = `
        <p><strong>Spanish:</strong> ${t.spanish}</p>
        <p><strong>French:</strong> ${t.french}</p>
        <p><strong>Category:</strong> ${t.category}</p>
    `;

    cardCounter.textContent = `${index + 1} / ${wineTerms.length}`;

}

/* Flip */

flashcard.onclick = () => {

    flashcard.classList.toggle("flipped");

};

/* Next */

nextCard.onclick = () => {

    index = (index + 1) % wineTerms.length;
    flashcard.classList.remove("flipped");
    loadCard();

};

/* Prev */

prevCard.onclick = () => {

    index = (index - 1 + wineTerms.length) % wineTerms.length;
    flashcard.classList.remove("flipped");
    loadCard();

};

/* Flip button */

flipCard.onclick = () => {

    flashcard.classList.toggle("flipped");

};

/* ============================= */
/* Top Button */
/* ============================= */

window.onscroll = () => {

    topButton.style.display =
        window.scrollY > 300 ? "block" : "none";

};

topButton.onclick = () => {

    window.scrollTo({ top: 0, behavior: "smooth" });

};
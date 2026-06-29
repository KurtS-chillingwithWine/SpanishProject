
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
const sortButton = document.getElementById("sortButton");
const topButton = document.getElementById("topButton");

/* ============================= */
/* State */
/* ============================= */

let isSorted = false;

/* ============================= */
/* Helpers */
/* ============================= */

function highlight(text, query) {

    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");

    return text.replace(regex, `<mark>$1</mark>`);

}

function buildTable(data, container, query = "") {

    container.innerHTML = "";

    data.forEach(term => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${highlight(term.english, query)}</td>

            <td>${highlight(term.spanish, query)}</td>

            <td>${highlight(term.french, query)}</td>

        `;

        container.appendChild(row);

    });

}

/* ============================= */
/* Initial Load */
/* ============================= */

function init() {

    buildTable(wineTerms, dictionaryBody);

    footerCount.textContent = `Total terms: ${wineTerms.length}`;

}

init();

/* ============================= */
/* Search */
/* ============================= */

searchInput.addEventListener("input", function () {

    const query = this.value.trim().toLowerCase();

    if (!query) {

        resultsSection.style.display = "none";

        resultCount.textContent = "";

        return;

    }

    const matches = wineTerms.filter(term =>

        term.english.toLowerCase().includes(query) ||

        term.spanish.toLowerCase().includes(query) ||

        term.french.toLowerCase().includes(query)

    );

    resultsSection.style.display = "block";

    resultCount.textContent = `${matches.length} result(s) found`;

    if (matches.length === 0) {

        resultsBody.innerHTML = "";

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

        buildTable(matches, resultsBody, query);

    }

});

/* ============================= */
/* Clear Search */
/* ============================= */

clearButton.addEventListener("click", function () {

    searchInput.value = "";

    resultsSection.style.display = "none";

    resultCount.textContent = "";

});

/* ============================= */
/* Sort A → Z */
/* ============================= */

sortButton.addEventListener("click", function () {

    isSorted = !isSorted;

    const sorted = [...wineTerms].sort((a, b) => {

        return a.english.localeCompare(b.english);

    });

    buildTable(isSorted ? sorted : wineTerms, dictionaryBody);

    sortButton.textContent = isSorted ? "Original Order" : "Sort A → Z";

});

/* ============================= */
/* Back to Top Button */
/* ============================= */

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ============================= */
/* Row click behavior */
/* ============================= */

document.addEventListener("click", function (e) {

    const row = e.target.closest("tr");

    if (!row || !row.children.length) return;

    const text = Array.from(row.children)

        .map(td => td.innerText)

        .join(" | ");

    navigator.clipboard.writeText(text);

});
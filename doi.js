import { doiUrl, openAthensUrl } from "./urls.js";

const form = document.querySelector("form");
const input = document.querySelector("#doi");
const error = document.querySelector("#error");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const doi = doiUrl(input.value);
  if (!doi) {
    error.textContent = "DOI 全体、または doi.org の URL を入力してください。";
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }

  location.href = openAthensUrl(doi);
});

input.addEventListener("input", () => {
  input.removeAttribute("aria-invalid");
  error.textContent = "";
});

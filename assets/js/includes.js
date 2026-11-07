async function loadIncludes() {
  const includes = document.querySelectorAll("[data-include]");

  await Promise.all([...includes].map(async (element) => {
    const response = await fetch(element.dataset.include);
    if (!response.ok) {
      throw new Error(`Include yüklenemedi: ${element.dataset.include}`);
    }
    element.outerHTML = await response.text();
  }));

  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelector(`[data-nav="${currentPage}"]`)?.setAttribute("aria-current", "page");
}

loadIncludes().catch((error) => console.error(error));

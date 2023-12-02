(() => {
  document.documentElement.addEventListener("click", () => {
    window.close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      window.close();
    }
  });
})();

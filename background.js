let blackoutWindowId = null;

function updateIcon(blackedOut) {
  browser.browserAction.setIcon({
    path: blackedOut ? "toolbar-button-filled.svg" : "toolbar-button-empty.svg",
  });
}

browser.browserAction.onClicked.addListener(async () => {
  if (blackoutWindowId) {
    const blackoutWindow = await browser.windows.get(blackoutWindowId);

    if (blackoutWindow) {
      browser.windows.update(blackoutWindowId, {
        focused: true,
      });

      return;
    }

    blackoutWindowId = null;
  }

  browser.windows
    .create({
      type: "popup",
      url: "window.html",
      state: "fullscreen",
    })
    .then((windowInfo) => {
      blackoutWindowId = windowInfo.id;
      updateIcon(true);
    });
});

browser.windows.onRemoved.addListener((windowId) => {
  if (windowId === blackoutWindowId) {
    blackoutWindowId = null;
    updateIcon(false);
  }
});

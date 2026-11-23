import { doiUrl, openAthensUrl } from "./urls.js";

const selectionMenu = "open-selected-doi";
const pasteMenu = "paste-doi";
const title = "UTokyo OA で開く";

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
    id: selectionMenu,
    title: "選択した DOI を UTokyo OA で開く",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: pasteMenu,
    title: "DOI を貼り付けて開く",
    contexts: ["action"],
  });
});

chrome.action.onClicked.addListener((tab) => {
  runInTab(tab, async () => {
    const pageUrl = openAthensUrl(tab.url);
    if (!pageUrl) {
      return "HTTP または HTTPS の論文ページで使用してください";
    }

    let selectedText = "";
    try {
      const [frame] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.getSelection()?.toString() ?? "",
      });
      selectedText = frame?.result ?? "";
    } catch {
      // Chrome の PDF ビューアなど、スクリプトを実行できないページ。
    }

    const doi = doiUrl(selectedText);
    await navigate(tab, doi ? openAthensUrl(doi) : pageUrl);
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === pasteMenu) {
    const options = { url: chrome.runtime.getURL("doi.html") };
    if (tab?.index !== undefined) {
      options.index = tab.index + 1;
      options.windowId = tab.windowId;
    }
    chrome.tabs.create(options).catch(console.error);
  }

  if (info.menuItemId === selectionMenu) {
    runInTab(tab, async () => {
      const doi = doiUrl(info.selectionText ?? "");
      if (!doi) {
        return "DOI 全体を選択してください";
      }

      await navigate(tab, openAthensUrl(doi));
    });
  }
});

async function navigate(tab, url) {
  const current = await chrome.tabs.get(tab.id);
  if ((tab.url && current.url && current.url !== tab.url) || current.pendingUrl) {
    return;
  }

  await chrome.tabs.update(tab.id, { url });
}

async function runInTab(tab, operation) {
  if (tab?.id === undefined) {
    return;
  }

  try {
    await showStatus(tab.id, "");
    const error = await operation();
    if (error) {
      await showStatus(tab.id, error);
    }
  } catch (error) {
    console.error(error);
    await showStatus(tab.id, "ページを開けませんでした。もう一度お試しください").catch(() => {});
  }
}

async function showStatus(tabId, message) {
  await chrome.action.setTitle({ tabId, title: message ? `UTokyo OA — ${message}` : title });
  await chrome.action.setBadgeText({ tabId, text: message ? "!" : "" });
}

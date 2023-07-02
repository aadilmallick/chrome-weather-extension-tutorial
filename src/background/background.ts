import {
  getStoredCities,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";

// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function
  setStoredCities([]);
  setStoredOptions({
    units: "metric",
    homeCity: "Great Falls",
    showCard: true,
  });

  // create contextMenus only in the onInstalled listener
  chrome.contextMenus.create({
    contexts: ["selection"],
    id: "weather",
    title: "Get weather for %s",
  });
});

chrome.contextMenus.onClicked.addListener(async (event) => {
  const cities = await getStoredCities();
  setStoredCities([...cities, event.selectionText]);
});

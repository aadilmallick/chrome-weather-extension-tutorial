export interface LocalStorageOptions {
  units?: "metric" | "imperial";
  homeCity?: string;
  showCard?: boolean;
}

const defaultOptions: LocalStorageOptions = {
  units: "metric",
  homeCity: "Great Falls",
  showCard: true,
};
export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

type LocalStorageKeys = keyof LocalStorage;

export function setStoredCities(cities: string[]): Promise<void> {
  console.log(cities);
  return new Promise((resolve) => {
    chrome.storage.local.set({ cities } as LocalStorage, () => resolve());
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ["cities"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result: LocalStorage) => {
      resolve(result.cities ?? []);
    });
  });
}

// I need to watch out for the destructuring of options
export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ options }, () => resolve());
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  // get the options key from storage
  const keys: LocalStorageKeys[] = ["options"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result) => {
      console.log(result);
      resolve(
        result.options ?? {
          units: "metric",
          homeCity: "Great Falls",
          showCard: true,
        }
      );
    });
  });
}
// 1. when the chrome runtime is installed, set the stored cities to an empty array
// 2. When the popup is opened, get the stored cities from storage and display them
// 3. When the user adds a city, add it to the stored cities and update the storage

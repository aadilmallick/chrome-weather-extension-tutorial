// TODO: content script
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./contentScript.css";
import { getStoredOptions } from "../utils/storage";
import {
  MessageTypes,
  addMessageListener,
  removeMessageListener,
  sendMessageFromContentScript,
} from "../utils/messages";

// make sure to reload extension for each change made to content script
// for your css, make sure to use !important to override styles

const App = () => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    async function getStoredData() {
      const storedOptions = await getStoredOptions();
      setShow(storedOptions.showCard);
    }

    getStoredData();
  }, []);

  useEffect(() => {
    const callback = addMessageListener(
      MessageTypes.TOGGLE_OVERLAY,
      (message, sender, sendResponse) => {
        setShow((prev) => !prev);
        // always need to send back a response, to avoid sending message error
        sendResponse("gay sex");
      }
    );

    return () => removeMessageListener(callback);
  }, []);
  console.log("show", show);
  if (!show) return null;
  return (
    <div className="absolute-card">
      <h1>Hello World</h1>
      <button
        onClick={async () => {
          setShow(false);
          await sendMessageFromContentScript(MessageTypes.TOGGLE_OVERLAY);
        }}
      >
        hide me
      </button>
    </div>
  );
};

const container = document.createElement("div");
container.id = "my-extension-root";
const root = createRoot(container);
document.body.appendChild(container);
root.render(<App />);

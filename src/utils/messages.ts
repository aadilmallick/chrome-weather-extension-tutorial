export enum MessageTypes {
  TOGGLE_OVERLAY = "TOGGLE_OVERLAY",
  GAY_SEX = "GAY_SEX",
}

export type Message = keyof typeof MessageTypes;

interface SendMessageToContentScript {
  message: Message;
  responseCallback?: (response?) => void;
}

export const sendMessageToContentScript = async (
  message: SendMessageToContentScript["message"],
  responseCallback?: SendMessageToContentScript["responseCallback"]
) => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

  const responseFunc =
    responseCallback ||
    function () {
      return true;
    };
  chrome.tabs.sendMessage(
    tabs[0].id!,
    {
      type: message,
    },
    responseFunc
  );
};

export type ReceivingMessage = {
  type: Message;
  payload?: { [key: string]: any };
};

type Optionalize<T> = {
  [P in keyof T]?: T[P];
};

type ReceivingMessageFunc = (
  message: ReceivingMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => void;

/**
 *
 * @desc to avoid error, you must send a response in the callback function.
 */
export const addMessageListener = (
  receivingMessage: Message,
  func: (
    msg?: ReceivingMessage,
    senderF?: chrome.runtime.MessageSender,
    sendResponseF?: (response?: any) => void
  ) => void
) => {
  const messageCallback = (
    message: ReceivingMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    if (message.type === receivingMessage) {
      func(message, sender, sendResponse);
      sendResponse();
    }

    // if not sending a response, you need to put this at the end to avoid
    // "Unchecked runtime.lastError: The message port closed before a response was received."
    return true;
  };
  chrome.runtime.onMessage.addListener(messageCallback);

  return messageCallback;
};

export const removeMessageListener = (callback: ReceivingMessageFunc) => {
  console.log("removing message listener");
  chrome.runtime.onMessage.removeListener(callback);
};

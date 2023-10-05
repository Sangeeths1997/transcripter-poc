async function startMeeting(url) {
  const dummyApiUrl = "https://jsonplaceholder.typicode.com/posts";

  try {
    const response = await fetch(dummyApiUrl, {
      method: "POST",
      body: JSON.stringify({
        title: url,
        body: "bar",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error("Error:", error);
  }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "startMeeting") {
    const url = message.url;
    startMeeting(url);
  }
});

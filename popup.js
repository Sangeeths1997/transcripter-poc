document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const description = document.getElementById("description");
  const descriptionWrong = document.getElementById("description-wrong");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    const url = currentTab.url;

    if (!isValidMeetingUrl(url)) {
      startButton.style.display = "none";
      description.style.display = "none";
      descriptionWrong.style.display = "flex";
    } else {
      startButton.style.display = "flex";
      description.style.display = "flex";
      descriptionWrong.style.display = "none";
    }

    startButton.addEventListener("click", function () {
      chrome.runtime.sendMessage({ action: "startMeeting", url: url });
    });
  });
});

function isValidMeetingUrl(url) {
  return (
    url.startsWith("https://meet.google.com/") ||
    url.startsWith("https://zoom.us/")
  );
}

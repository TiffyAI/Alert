self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil(clients.claim()));

// Handle notification from main thread
self.addEventListener("message", event => {
  if (event.data?.type === "notify") {
    self.registration.showNotification(event.data.title, {
      body: event.data.message,
      icon: "https://tiffyai.github.io/TiffyAI-Token.png",
      tag: "claim-tiffy-reminder",
      data: { url: event.data.url }
    });
  }
});

// Handle user clicking the notification
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(urlToOpen));
});

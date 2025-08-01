// sw.js

self.addEventListener('install', event => {
  console.log("📦 Service Worker installed");
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log("🚀 Service Worker activated");
  return self.clients.claim();
});

self.addEventListener('message', event => {
  if (event.data?.type === 'notify') {
    const { title, message, url } = event.data;

    self.registration.showNotification(title, {
      body: message,
      icon: 'https://tiffyai.github.io/icon.png', // Update if needed
      badge: 'https://tiffyai.github.io/badge.png', // Optional
      data: { url },
      vibrate: [100, 50, 100],
      tag: 'tiffy-reminder'
    });
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.notification.data?.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});

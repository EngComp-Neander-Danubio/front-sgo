// src/sw.ts

self.addEventListener('push', (event) => {
  const options = {
    body: 'Esta é uma notificação push de exemplo!',
  }

  event.waitUntil(
    self.registration.showNotification('Título da Notificação', options),
  )
})

<template>
  <section class="section section_default">
    <h1>Fehler 404 - Seite nicht gefunden!</h1>
    <p>Die gesuchte Seite wurde nicht gefunden! Wenn Du den Link in Deinen Bookmarks gespeichert hast ändere ihn bitte!</p>
    <router-link :to="{name: 'index'}">Zur Startseite</router-link>
  </section>
</template>

<script>
export default {
  name: 'not-found-view'
}
</script>

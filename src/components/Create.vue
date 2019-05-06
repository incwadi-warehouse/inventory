<template>
  <section class="section section_fixed">
    <h1>{{ $t('add_book') }}</h1>
    <form class="form" @submit.prevent="add">
      <div class="form_group">
        <div class="form_item">
          <label for="genre" class="form_label">
            {{ $t('genre') }}
          </label>
        </div>
        <div class="form_item">
          <select id="genre" class="form_input" required v-model="genre">
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
              {{genre.name}}
            </option>
          </select>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="title" class="form_label">
            {{ $t('title') }}
          </label>
        </div>
        <div class="form_item">
          <input type="text" id="title" class="form_input" maxlength="255" required v-model="title">
        </div>
      </div>
      <div class="form_group">
          <div class="form_item">
            <label for="firstname" class="form_label">
              {{ $t('firstname') }}
            </label>
          </div>
          <div class="form_item">
            <input type="text" id="firstname" class="form_input" maxlength="255" required v-model="firstname">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="lastname" class="form_label">
              {{ $t('lastname') }}
            </label>
          </div>
          <div class="form_item">
            <input type="text" id="lastname" class="form_input" maxlength="255" required v-model="lastname">
          </div>
        </div>
      <div class="form_group">
        <div class="form_item">
          <label for="author" class="form_label">
            {{ $t('release_year') }}
          </label>
        </div>
        <div class="form_item">
          <input type="number" id="author" class="form_input" min="1000" max="9999" required v-model="yearOfPublication">
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="author" class="form_label">
            {{ $t('type') }}
          </label>
        </div>
        <div class="form_item">
          <select id="type" class="form_input" v-model="type">
            <option value="paperback">{{ $t('paperback') }}</option>
            <option value="hardcover">{{ $t('hardcover') }}</option>
          </select>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <input type="checkbox" id="premium" v-model="premium">
          <label for="premium" class="form_label">
            {{ $t('premium') }}
          </label>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="price" class="form_label">
            {{ $t('price') }} ({{currency}})
          </label>
        </div>
        <div class="form_item">
          <input type="number" id="price" class="form_input" :step="steps" @change="formatPrice" required v-model="price">
        </div>
      </div>
      <div class="form_group">
        <div class="form_item alignRight">
          <button type="submit" class="btn btn_branded">{{ $t('add') }}</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'create',
  data () {
    return {
      title: null,
      firstname: '',
      lastname: '',
      price: '2.50',
      currency: process.env.CURRENCY,
      yearOfPublication: 2019,
      type: 'paperback',
      premium: false,
      genre: null
    }
  },
  computed: {
    steps: function () {
      return process.env.STEPS
    },
    genres: function () {
      return this.$store.state.genres.genres
    }
  },
  methods: {
    add: function () {
      this.$store.dispatch('books/create', {
        title: this.title,
        author: this.lastname + ',' + this.firstname,
        genre: this.genre,
        price: this.price,
        stocked: true,
        yearOfPublication: this.yearOfPublication,
        type: this.type,
        premium: this.premium,
        added: Math.round(new Date().getTime() / 1000)
      })
      this.$store.dispatch('toggleShowCreate')
    },
    formatPrice: function () {
      this.price = Number.parseFloat(this.price).toFixed(2)
    }
  },
  mounted: function () {
    this.$store.dispatch('genres/genres')
  }
}
</script>

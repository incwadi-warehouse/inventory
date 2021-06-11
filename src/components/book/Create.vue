<template>
  <b-form @submit.prevent="create">
    <b-modal @close="$emit('close', $event)">
      <template #title>
        {{ $t('catalog') }}
      </template>
      <template #footer>
        <b-form-group buttons>
          <b-form-item>
            <b-button design="outline" @click.prevent="$emit('close', $event)">
              {{ $t('cancel') }}
            </b-button>
            <b-button design="primary">
              {{ $t('add') }}
            </b-button>
          </b-form-item>
        </b-form-group>
      </template>

      <b-container size="m">
        <b-form-group>
          <b-form-item>
            <b-form-label for="genre">
              {{ $t('genre') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select id="genre" required v-model="genreId">
              <option></option>
              <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                {{ genre.name }}
              </option>
            </b-form-select>
          </b-form-item>
        </b-form-group>
        <b-form-group>
          <b-form-item>
            <b-form-label for="title">
              {{ $t('title') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="title"
              maxlength="255"
              required
              v-model="title"
            />
          </b-form-item>
        </b-form-group>

        <!-- short description -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="shortDescription">
              {{ $t('shortDescription') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-textarea
              type="text"
              id="shortDescription"
              :rows="5"
              v-model="shortDescription"
            />
          </b-form-item>
        </b-form-group>

        <b-form-group>
          <b-form-item>
            <b-form-label for="authorFirstname">
              {{ $t('firstname') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="authorFirstname"
              maxlength="255"
              v-model="authorFirstname"
            />
          </b-form-item>
        </b-form-group>
        <b-form-group>
          <b-form-item>
            <b-form-label for="authorSurname">
              {{ $t('surname') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="authorSurname"
              maxlength="255"
              required
              v-model="authorSurname"
            />
          </b-form-item>
        </b-form-group>
        <b-form-group>
          <b-form-item>
            <b-form-label for="author">
              {{ $t('release_year') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="number"
              id="author"
              min="1000"
              max="9999"
              required
              v-model="releaseYear"
            />
          </b-form-item>
        </b-form-group>
        <b-form-group>
          <b-form-item>
            <b-form-label for="type">
              {{ $t('type') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select id="type" v-model="type">
              <option value="paperback">{{ $t('paperback') }}</option>
              <option value="hardcover">{{ $t('hardcover') }}</option>
            </b-form-select>
          </b-form-item>
        </b-form-group>
        <b-form-group>
          <b-form-item>
            <b-form-label for="price">
              {{ $t('price') }}
              <span v-if="branch">({{ branch.currency }})</span>
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="number"
              id="price"
              :step="branch.steps"
              pattern="^\d+(\.|,)?\d{0,2}$"
              required
              v-model="price"
              v-if="branch && branch.steps > 0"
            />
            <b-form-input
              type="text"
              id="price"
              pattern="^\d+(\.|,)?\d{0,2}$"
              required
              v-model="price"
              v-else
            />
          </b-form-item>
        </b-form-group>
        <b-form-group>
          <b-form-item>
            <b-form-label for="added">
              {{ $t('added') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input type="date" id="added" v-model="added" />
          </b-form-item>
        </b-form-group>
        <b-form-group>
          <b-form-item>
            <b-form-label for="cond">
              {{ $t('condition') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select id="cond" v-model="cond_id">
              <option value=""></option>
              <option
                :value="condition.id"
                v-for="condition in conditions"
                :key="condition.id"
              >
                {{ condition.name }}
              </option>
            </b-form-select>
          </b-form-item>
        </b-form-group>

        <!-- tags -->
        <b-form @submit.prevent="createTag">
          <b-form-group>
            <span v-for="(tag, index) in tags" :key="tag.id">
              {{ tag.name }}
              <span @click="removeTag(tag)">
                <b-icon type="close" :size="12" />
              </span>
              <span v-if="index !== tags.length - 1">, </span>
            </span>
          </b-form-group>
          <b-form-group>
            <b-form-item>
              <b-form-label for="tag">{{ $t('add_tag') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input type="text" id="tag" v-model="tag" />
            </b-form-item>
          </b-form-group>
          <b-form-group buttons>
            <b-button design="outline">{{ $t('add_tag') }}</b-button>
          </b-form-group>
        </b-form>
        <!-- /tags -->
      </b-container>
    </b-modal>
  </b-form>
</template>

<script>
import formatDate from './../../util/date'
import { mapState } from 'vuex'

export default {
  name: 'create-book',
  data() {
    return {
      added: formatDate(Math.round(new Date().getTime() / 1000) * 1000),
      title: null,
      shortDescription: null,
      authorFirstname: '',
      authorSurname: null,
      genreId: null,
      price: '2.50',
      sold: false,
      removed: false,
      releaseYear: new Date().getFullYear(),
      type: 'paperback',
      lendTo: null,
      lendOn: null,
      cond_id: null,
      tag: null,
    }
  },
  computed: {
    ...mapState('genre', ['genres']),
    ...mapState('condition', ['conditions']),
    ...mapState('branch', ['branch']),
    tags: function () {
      return this.$store.state.tag.tags
    },
  },
  methods: {
    create() {
      let tags = []
      this.tags.forEach((element) => {
        tags.push(element.id)
      })

      this.$store
        .dispatch('book/create', {
          added: new Date(this.added).getTime() / 1000,
          title: this.title,
          shortDescription: this.shortDescription,
          author: this.authorSurname + ',' + this.authorFirstname,
          genre: this.genreId,
          price: this.price,
          sold: false,
          removed: false,
          releaseYear: this.releaseYear,
          type: this.type,
          lendTo: null,
          lendOn: null,
          cond: this.cond_id,
          tags: tags,
        })
        .then(() => {
          this.$emit('created', this.$event)
        })
    },
    createTag() {
      this.$store.dispatch('tag/create', this.tag)
      this.tag = null
    },
    removeTag(tag) {
      this.$store.commit('tag/removeTag', tag)
    },
  },
  created() {
    this.$store.dispatch('branch/branch')
    this.$store.dispatch('genre/genres')
    this.$store.dispatch('condition/list')
  },
  destroyed() {
    this.$store.commit('tag/tags', [])
  },
}
</script>

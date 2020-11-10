<template>
  <b-modal @close="$emit('close', $event)">
    <b-container size="m">
      <h1>{{ $t('edit_book') }}</h1>
    </b-container>

    <b-container size="m" v-if="book">
      <b-form @submit.prevent="update()">
        <b-form-group>
          <b-form-item>
            <b-form-label for="genre">
              {{ $t('genre') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select id="genre" required v-model="genreId">
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
            <b-form-label for="releaseYear">
              {{ $t('release_year') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="number"
              id="releaseYear"
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
            <input type="checkbox" name="sold" id="sold" v-model="sold" />
            <b-form-label for="sold">
              {{ $t('sold') }}
            </b-form-label>
          </b-form-item>
        </b-form-group>
        <b-form-group>
          <b-form-item>
            <input
              type="checkbox"
              name="removed"
              id="removed"
              v-model="removed"
            />
            <b-form-label for="removed">
              {{ $t('removed') }}
            </b-form-label>
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
            <b-form-label for="lendTo">
              {{ $t('lend_to') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select id="lendTo" v-model="lendTo" @change="lending">
              <option value=""></option>
              <option
                v-for="member in staff"
                :key="member.id"
                :value="member.id"
              >
                {{ member.name }}
              </option>
            </b-form-select>
          </b-form-item>
        </b-form-group>
        <b-form-group>
          <b-form-item>
            <b-form-label for="lendOn">
              {{ $t('lend_on') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input type="date" id="lendOn" v-model="lendOn" />
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

        <b-form-group buttons>
          <b-form-item>
            <b-button design="primary">
              {{ $t('update') }}
            </b-button>
          </b-form-item>
        </b-form-group>
      </b-form>
    </b-container>
  </b-modal>
</template>

<script>
import formatDate from './../../util/date'
import { mapState } from 'vuex'

export default {
  name: 'edit-book',
  props: ['book'],
  data() {
    return {
      added: formatDate(this.book.added * 1000),
      title: this.book.title,
      authorFirstname: this.book.author ? this.book.author.firstname : null,
      authorSurname: this.book.author ? this.book.author.surname : null,
      genreId: this.book.genre ? this.book.genre.id : null,
      price: this.book.price,
      sold: this.book.sold,
      removed: this.book.removed,
      releaseYear: this.book.releaseYear,
      type: this.book.type,
      lendTo: this.book.lendTo,
      lendOn: this.book.lendOn
        ? formatDate(this.book.lendOn * 1000)
        : this.book.lendOn,
      cond_id: this.book.condition ? this.book.condition.id : null,
      tag: this.book.tag,
    }
  },
  computed: {
    ...mapState('branch', ['branch']),
    ...mapState('genre', ['genres']),
    ...mapState('staff', ['staff']),
    ...mapState('condition', ['conditions']),
    tags() {
      return this.$store.state.tag.tags
    },
  },
  methods: {
    update() {
      let tags = []
      this.tags.forEach((element) => {
        tags.push(element.id)
      })

      this.$store
        .dispatch('book/update', {
          id: this.book.id,
          added: new Date(this.added).getTime() / 1000,
          title: this.title,
          author: this.authorSurname + ',' + this.authorFirstname,
          genre: this.genreId,
          price: this.price,
          sold: this.sold,
          removed: this.removed,
          releaseYear: this.releaseYear,
          type: this.type,
          lendTo: this.lendTo,
          lendOn: this.lendOn ? new Date(this.lendOn).getTime() / 1000 : null,
          cond: this.cond_id,
          tags: tags,
        })
        .then(() => {
          this.$emit('close', this.$event)
        })
    },
    lending() {
      if (!this.lendTo) return (this.lendOn = null)
      return (this.lendOn = formatDate(new Date().getTime()))
    },
    createTag() {
      this.$store.dispatch('tag/create', this.tag)
      this.tag = null
    },
    removeTag(tag) {
      this.$store.dispatch('tag/remove', tag)
    },
  },
  created() {
    this.$store.dispatch('branch/branch')
    this.$store.dispatch('genre/genres')
    this.$store.dispatch('staff/staff')
    this.$store.dispatch('condition/list')
  },
  destroyed() {
    this.$store.commit('tag/tags', [])
  },
}
</script>

<template>
  <b-form @submit.prevent="update()">
    <b-modal @close="$emit('close', $event)">
      <b-container size="m" v-if="book.reserved">
        <b-notification type="warning">
          <p>{{ $t('doNotEditReservedBooks') }}</p>
        </b-notification>
      </b-container>

      <template #title>
        {{ $t('edit_book') }}
      </template>
      <template #footer>
        <b-form-group buttons>
          <b-form-item>
            <b-button design="primary">
              {{ $t('update') }}
            </b-button>
          </b-form-item>
        </b-form-group>
      </template>

      <b-container size="m" v-if="book">
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
              :rows="4"
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

        <!-- format -->
        <b-form-group v-if="state.formats">
          <b-form-item>
            <b-form-label for="format">
              {{ $t('format') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select id="type" v-model="format">
              <option
                v-for="item in state.formats"
                :value="item.id"
                :key="item.id"
              >
                {{ item.name }}
              </option>
            </b-form-select>
          </b-form-item>
        </b-form-group>

        <b-form-group>
          <b-form-item>
            <b-form-label for="price">
              {{ $t('price') }}
              <span v-if="me">({{ me.branch.currency }})</span>
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="number"
              id="price"
              :step="me.branch.steps"
              pattern="^\d+(\.|,)?\d{0,2}$"
              required
              v-model="price"
              v-if="me && me.branch.steps > 0"
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

        <details v-if="me">
          <summary>{{ $t('pricelist') }}</summary>
          <book-price-calculator
            :list="pricelist"
            :currency="me.branch.currency"
          />
        </details>

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

        <!-- reserved -->
        <b-form-group>
          <b-form-item>
            <input
              type="checkbox"
              name="reserved"
              id="reserved"
              v-model="reserved"
            />
            <b-form-label for="reserved">
              {{ $t('reserved') }}
            </b-form-label>
          </b-form-item>
        </b-form-group>

        <!-- recommendation -->
        <b-form-group>
          <b-form-item>
            <input
              type="checkbox"
              name="recommendation"
              id="recommendation"
              v-model="recommendation"
            />
            <b-form-label for="recommendation">
              {{ $t('recommendation') }}
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

        <!-- cover -->
        <div v-if="cover">
          <!-- status -->
          <b-notification type="neutral" v-if="isUploading">
            <p>{{ $t('uploadingFile') }}</p>
          </b-notification>
          <b-notification type="error" hidable v-if="hasErrorUploading">
            <p>{{ $t('coverUploadError') }}</p>
          </b-notification>

          <div v-if="cover.cover_s || cover.cover_m || cover.cover_l">
            <!-- remove -->
            <b-button
              type="button"
              design="outline_danger"
              @click="removeCover"
              :style="{ float: 'right' }"
            >
              {{ $t('removeCover') }}
            </b-button>

            <!-- show -->
            <img :src="cover.cover_m" alt="Cover" />
          </div>

          <div v-else>
            <!-- tabs -->
            <div class="tabs">
              <ul>
                <li @click="tab = 'upload'">{{ $t('upload') }}</li>
                <li @click="tab = 'file-manager'">
                  {{ $t('file_manager') }} (Experiment)
                </li>
              </ul>
            </div>

            <!-- upload -->
            <b-form
              enctype="multipart/form-data"
              @submit.prevent
              v-if="!isUploading && tab == 'upload'"
            >
              <b-form-group>
                <b-form-item>
                  <b-form-label for="cover">{{ $t('cover') }}</b-form-label>
                </b-form-item>
                <b-form-item
                  :style="{
                    position: 'relative',
                    height: '300px',
                    border: isDragging
                      ? '1px solid var(--color-primary-10)'
                      : '1px solid var(--color-neutral-02)',
                    borderRadius: '5px',
                  }"
                >
                  <p
                    :style="{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '100%',
                      textAlign: 'center',
                    }"
                  >
                    {{ $t('drop_the_file_in_this_area_or_click_here') }}
                  </p>
                  <div
                    :style="{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    }"
                    @dragover="isDragging = true"
                    @dragenter="isDragging = true"
                    @dragleave="isDragging = false"
                    @dragend="isDragging = false"
                    @drop="isDragging = false"
                  >
                    <b-form-input
                      type="file"
                      id="cover"
                      @change="upload($event)"
                      event
                      accept="image/jpeg, image/jpg, image/png, image/webp"
                      :style="{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: '0.001',
                      }"
                    />
                  </div>
                </b-form-item>
              </b-form-group>
            </b-form>

            <!-- directory -->
            <directory-file-manager
              :id="book.id"
              @update="setCover"
              v-if="tab == 'file-manager'"
            />
          </div>
        </div>
      </b-container>
    </b-modal>
  </b-form>
</template>

<script>
import formatDate from './../../util/date'
import { mapState } from 'vuex'
import { list } from '@/api/format'
import {
  onMounted,
  reactive,
  ref,
  computed,
  toRefs,
} from '@vue/composition-api'
import DirectoryFileManager from '@/components/directory/FileManager'
import BookPriceCalculator from '@/components/book/PriceCalculator'

export default {
  name: 'edit-book',
  props: ['book', 'me'],
  components: {
    DirectoryFileManager,
    BookPriceCalculator,
  },
  setup(props) {
    const state = reactive({
      formats: null,
    })

    const tab = ref('upload')

    onMounted(() => {
      list().then((response) => {
        state.formats = response.data
      })
    })

    const { me } = toRefs(props)
    const pricelist = computed(() => {
      return me.value ? JSON.parse(me.value.branch.pricelist) : null
    })

    return { state, tab, pricelist }
  },
  data() {
    return {
      added: formatDate(this.book.added * 1000),
      title: this.book.title,
      shortDescription: this.book.shortDescription,
      authorFirstname: this.book.author ? this.book.author.firstname : null,
      authorSurname: this.book.author ? this.book.author.surname : null,
      genreId: this.book.genre ? this.book.genre.id : null,
      price: this.book.price,
      sold: this.book.sold,
      removed: this.book.removed,
      reserved: this.book.reserved,
      releaseYear: this.book.releaseYear,
      cond_id: this.book.condition ? this.book.condition.id : null,
      tag: this.book.tag,
      recommendation: this.book.recommendation,
      isUploading: false,
      hasErrorUploading: false,
      isDragging: false,
      format: this.book.format ? this.book.format.id : null,
    }
  },
  computed: {
    ...mapState('genre', ['genres']),
    ...mapState('staff', ['staff']),
    ...mapState('condition', ['conditions']),
    ...mapState('book', ['cover']),
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
          me: this.me,
          id: this.book.id,
          added: new Date(this.added).getTime() / 1000,
          title: this.title,
          shortDescription: this.shortDescription,
          author: this.authorSurname + ',' + this.authorFirstname,
          genre: this.genreId,
          price: this.price,
          sold: this.sold,
          removed: this.removed,
          reserved: this.reserved,
          releaseYear: this.releaseYear,
          cond: this.cond_id,
          tags: tags,
          recommendation: this.recommendation,
          format: this.format,
        })
        .then(() => {
          this.$emit('update-book', this.$event)
        })
    },
    createTag() {
      this.$store.dispatch('tag/create', this.tag)
      this.tag = null
    },
    removeTag(tag) {
      this.$store.commit('tag/removeTag', tag)
    },
    upload(event) {
      this.isUploading = true
      const file = event.target.files[0]
      const form = new FormData()
      form.append('cover', file)
      this.$store
        .dispatch('book/upload', { id: this.book.id, form: form })
        .catch(() => {
          this.hasErrorUploading = true
        })
        .then(() => {
          this.$store.dispatch('book/getCover', this.book)
        })
        .finally(() => {
          this.isUploading = false
        })
    },
    setCover() {
      this.$store.dispatch('book/getCover', this.book)
    },
    removeCover() {
      this.$store.dispatch('book/removeCover', this.book)
    },
  },
  created() {
    this.$store.dispatch('genre/genres')
    this.$store.dispatch('staff/staff')
    this.$store.dispatch('condition/list')
    this.$store.dispatch('book/getCover', this.book)
  },
  destroyed() {
    this.$store.commit('tag/tags', [])
  },
}
</script>

<style scoped>
.tabs {
  margin: 10px 0;
  overflow: auto;
}
.tabs ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.tabs li {
  float: left;
  background: var(--color-neutral-02);
  border-radius: 10px;
  padding: 10px;
  margin-right: 20px;
  cursor: pointer;
}
</style>

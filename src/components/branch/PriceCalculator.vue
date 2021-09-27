<template>
  <b-form @submit.prevent="update" v-if="branch">
    <!-- Base Price -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="baseprice">{{ $t('baseprice') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input
          type="number"
          id="baseprice"
          v-model="state.pricelist.base"
        />
      </b-form-item>
    </b-form-group>

    <!-- Release Year -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="releaseYear">{{ $t('releaseYear') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-helpline>{{ $t('priceCalcReleaseYearHelp') }}</b-form-helpline>
      </b-form-item>
      <b-form-item>
        <b-form-textarea
          rows="5"
          id="releaseYear"
          v-model="state.releaseYear"
        />
      </b-form-item>
    </b-form-group>

    <!-- Condition -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="condition">{{ $t('condition') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-helpline>{{ $t('priceCalcConditionHelp') }}</b-form-helpline>
      </b-form-item>
      <b-form-item>
        <b-form-textarea rows="5" id="condition" v-model="state.condition" />
      </b-form-item>
    </b-form-group>

    <!-- Buttons -->
    <b-form-group buttons v-if="me && me.isAdmin">
      <b-form-group>
        <b-form-item>
          <b-button design="outline">{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form-group>
  </b-form>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from '@vue/composition-api'

export default {
  name: 'branch-price-calculator',
  props: {
    branch: {
      type: Object,
      required: true,
    },
    me: Object,
  },
  setup(props) {
    const { branch } = toRefs(props)

    const state = reactive({
      base: branch.value.pricelist
        ? JSON.parse(branch.value.pricelist).base
        : 0,
      pricelist: branch.value.pricelist
        ? JSON.parse(branch.value.pricelist)
        : {
            base: 0,
            releaseYear: {},
            condition: {},
          },
      releaseYear: null,
      condition: null,
    })

    const toString = (id) => {
      if (!branch.value.pricelist) return

      let pricelist = JSON.parse(branch.value.pricelist)[id]
      let elements = ''

      for (let key in pricelist) {
        elements += key + ':' + pricelist[key] + '\n'
      }

      state[id] = elements
    }

    const toArray = (value, id) => {
      let prices = {}

      value.split('\n').forEach((element) => {
        let item = element.split(':')

        if ('' === item[0] || undefined === item[1]) return

        prices[item[0]] = item[1]
      })

      state.pricelist[id] = prices
    }

    onMounted(() => {
      toString('releaseYear')
      toString('condition')
    })

    watch(
      () => state.releaseYear,
      (value) => {
        toArray(value, 'releaseYear')
      }
    )

    watch(
      () => state.condition,
      (value) => {
        toArray(value, 'condition')
      }
    )

    return { state }
  },
  data() {
    return {
      name: this.branch.name,
      steps: this.branch.steps,
      currency: this.branch.currency,
      ordering: this.branch.ordering,
      orderBy: this.branch.orderBy,
      isPublic: this.branch.public,
    }
  },
  methods: {
    update: function () {
      if (!this.me || !this.me.isAdmin) return
      this.$store.dispatch('branch/update', {
        id: this.branch.id,
        name: this.name,
        steps: this.steps,
        currency: this.currency,
        ordering: this.ordering,
        orderBy: this.orderBy,
        public: this.isPublic,
        pricelist: JSON.stringify(this.state.pricelist),
      })
    },
  },
}
</script>

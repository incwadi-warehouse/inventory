<template>
  <b-table v-if="inventories">
    <table>
      <thead>
        <tr>
          <th scope="col">{{ $t('startedAt') }}</th>
          <th scope="col">{{ $t('endedAt') }}</th>
          <th scope="col" :style="{ textAlign: 'right' }">{{ $t('found') }}</th>
          <th scope="col" :style="{ textAlign: 'right' }">
            {{ $t('notFound') }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="inventory in inventories" :key="inventory.id">
          <td>{{ formatDate(inventory.startedAt * 1000) }}</td>
          <td>
            {{
              inventory.endedAt ? formatDate(inventory.endedAt * 1000) : null
            }}
            <b-button
              design="text"
              @click="$emit('end', inventory.id)"
              v-if="null === inventory.endedAt"
            >
              {{ $t('end') }}
            </b-button>
          </td>
          <td :style="{ textAlign: 'right' }">{{ inventory.found }}</td>
          <td :style="{ textAlign: 'right' }">{{ inventory.notFound }}</td>
        </tr>
      </tbody>
    </table>
  </b-table>
</template>

<script>
import formatDate from '@/util/date'

export default {
  name: 'inventory-list',
  props: {
    inventories: Array,
    me: Object,
  },
  methods: {
    formatDate,
  },
}
</script>

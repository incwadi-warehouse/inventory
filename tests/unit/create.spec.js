import { shallowMount } from '@vue/test-utils'
import Create from './../../src/components/Create'

describe('Create', () => {
  it('renders a section', () => {
    const $store = {
      state: {},
      dispatch: function () {
        return
      }
    }
    const wrapper = shallowMount(Create, {
      mocks: {
        $store
      }
    })

    expect(wrapper.contains('section')).toBe(true)
  })
})

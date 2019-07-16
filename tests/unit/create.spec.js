import { shallowMount } from '@vue/test-utils'
import Create from './../../src/components/book/Create'
const $t = () => { }

describe('Create', () => {
  it('renders a section', () => {
    const $store = {
      state: {
        books: {
          hasCreateError: false,
          isDuplicate: false
        },
        genres: {
          genres: null
        }
      },
      dispatch: function () {
        return
      }
    }
    const wrapper = shallowMount(Create, {
      mocks: {
        $store,
        $t
      }
    })

    expect(wrapper.contains('section')).toBe(true)
  })
})

import { mount, createLocalVue } from '@vue/test-utils'
import Edit from './../../src/components/author/Edit'
import VueCompositionApi from '@vue/composition-api'
import components from '@baldeweg/components'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)
localVue.use(components)

describe('Edit', () => {
  it('renders the edit form', () => {
    const $t = () => {}
    const wrapper = mount(Edit, {
      localVue,
      propsData: {
        author: {
          firstname: 'firstname',
          surname: 'surname',
        },
      },
      mocks: {
        $t,
      },
    })

    expect(wrapper.find('form').exists()).toBeTruthy()
  })
})

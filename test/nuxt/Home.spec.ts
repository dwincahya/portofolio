import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import Home from '~/components/sections/Home.vue'

describe('Home section', () => {
  it('renders the Indonesian home content by default', async () => {
    const wrapper = await mountSuspended(Home)

    expect(wrapper.find('section#home').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Dwi Nur Cahya')
    expect(wrapper.find('p').text()).toBe(
      'Membangun, belajar, dan berkembang di dunia digital.',
    )
    expect(wrapper.find('button').text()).toBe('Unduh CV')
  })

  it('renders the CV link with the configured URL and external target', async () => {
    const wrapper = await mountSuspended(Home)
    const link = wrapper.find('a')

    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe(
      'https://drive.google.com/file/d/1wVX1sMSLf6GAouCyCgeW-YyIzSkLHkHD/view?usp=sharing',
    )
    expect(link.attributes('target')).toBe('_blank')
  })
})

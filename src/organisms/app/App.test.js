import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '../../index';
import App from './App.vue';

// Mock components for simplicity
jest.mock('../../molecules/shows/Shows.vue', () => ({
    name: 'Shows',
    render: () => null,
}));

jest.mock('../../molecules/search/Search.vue', () => ({
    name: 'Search',
    render: () => null,
}));

jest.mock('../../molecules/show/Show.vue', () => ({
    name: 'Show',
    render: () => null,
}));

describe('App', () => {
  let router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    });
  });

  it('displays the Show dialog on show details page', async () => {
    router.push('/show/1');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();
    expect(wrapper.findComponent({ name: 'Show' }).exists()).toBe(true);
    expect(wrapper.vm.isOnShowDetailsPage).toBe(true);
  });

  it('displays the Search dialog on search page', async () => {
    router.push('/search/1');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();
    expect(wrapper.findComponent({ name: 'Search' }).exists()).toBe(true);
    expect(wrapper.vm.isOnSearchPage).toBe(true);
  });

});

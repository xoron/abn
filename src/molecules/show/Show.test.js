import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '../../index';
import ShowDetails from './Show.vue';

// Mock fetch response
const mockShow = {
  id: "1",
  name: "Mock Show",
  rating: { average: 9.0 },
  summary: "<p>Test summary</p>",
};

// Mock fetch failure
const mockFetchFailure = jest.fn(() =>
  Promise.reject("API is down")
);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockShow),
  })
);

jest.mock('../../atoms/render-visible/RenderVisible.vue', () => ({
  name: 'RenderVisible',
  template: '<div><slot /></div>',
}));

jest.mock('../../atoms/show-image/ShowImage.vue', () => ({
  name: 'ShowImage',
  template: '<div><slot /></div>',
}));

describe('ShowDetails', () => {
  let router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    });
    fetch.mockClear();
  });

  it('fetches and displays show details on mount', async () => {
    router.push('/show/1');
    await router.isReady();

    const wrapper = mount(ShowDetails, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.show.name).toContain("Mock Show");
    expect(wrapper.vm.show.summary).toContain("<p>Test summary</p>");
    expect(wrapper.vm.show.rating?.average).toBe(9.0);
  });

  it('handles API fetch failures gracefully', async () => {
    fetch.mockImplementationOnce(mockFetchFailure);
    router.push('/show/2');
    await router.isReady();

    const wrapper = mount(ShowDetails, {
      global: {
        plugins: [router],
      },
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.show.name).toBe(undefined);
  });

  it('uses the showId prop when provided', async () => {
    const customShowId = "123";
    mount(ShowDetails, {
      props: { showId: customShowId },
      global: {
        plugins: [router],
      },
    });

    expect(fetch).toHaveBeenCalledWith(`https://api.tvmaze.com/shows/${customShowId}`);
  });
});

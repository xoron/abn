import { mount, flushPromises } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import ShowsView from './Shows.vue';
import { useShowsStore } from '../../store/store';

// Mock fetch global
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { name: 'aaa', genres: ['Comedy'], rating: { average: 5.0 } },
      { name: 'bbb', genres: ['Drama', 'Comedy'], rating: { average: 5.0 } }
    ])
  })
);
// TODO: fix how to mock the store
xdescribe('Shows', () => {
  let testingPinia;
  beforeEach(() => {
    fetch.mockClear();
    testingPinia = createTestingPinia({
      createSpy: jest.fn,
      stubActions: false
    });

    
  });

  it('fetches shows and extracts unique genres on mount', async () => {
    const wrapper = mount(ShowsView, {
      global: {
        plugins: [createTestingPinia({
          createSpy: jest.fn,
        })],
      },
    });
    await flushPromises();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.genres).toEqual(expect.arrayContaining(['Comedy', 'Drama']));
  });

  it('renders a Category component for each unique genre', async () => {
    const showsStore = useShowsStore();
    // Directly manipulate the store's state for testing purposes
    showsStore.$patch({
      cache: [
        { name: 'aaa', genres: ['Comedy'], rating: { average: 5.0 } },
        { name: 'bbb', genres: ['Drama', 'Comedy'], rating: { average: 5.0 } }
      ],
      genres: ['Comedy', 'Drama']
    });
    const wrapper = mount(ShowsView, {
      global: {
        plugins: [createTestingPinia({
          createSpy: jest.fn,
        })],
      },
    });

    await flushPromises();
    console.log(wrapper.vm.genres);
    await wrapper.vm.$nextTick();
    console.log(wrapper.vm.genres);
    console.log(wrapper.html());

    const genreComponents = wrapper.findAll('[data-test="genre"]');
    expect(genreComponents).toHaveLength(2); // Because there are 2 unique genres in the mock response.
  });
});

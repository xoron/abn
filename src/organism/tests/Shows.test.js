import { mount } from '@vue/test-utils';
import Shows from '../Shows.vue';
// import Genre from '../Genre.vue';

function flushPromises() {
    return new Promise((resolve) => setTimeout(resolve));
}

// Mock fetch global
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { genres: ['Comedy'], rating: { average: 5.0 } }, 
      { genres: ['Drama', 'Comedy'], rating: { average: 5.0 } }
    ])
  })
);

describe('Shows', () => {
  beforeEach(() => {
    // Clear mock between tests
    fetch.mockClear();
  });

  it('fetches shows and extracts unique genres on mount', async () => {
    const wrapper = mount(Shows);
    await flushPromises();

    expect(fetch).toHaveBeenCalledTimes(1);
    // Correctly targeting the genres array inside the component's instance.
    expect(wrapper.vm.shows.genres).toEqual(expect.arrayContaining(['Comedy', 'Drama']));
  });

  it('renders a Genre component for each unique genre', async () => {
    const wrapper = mount(Shows);
  
    // Wait for the fetch operation and Vue updates to complete.
    await flushPromises();
  
    const genreComponents = wrapper.findAll('[data-test="genre"]')
    expect(genreComponents).toHaveLength(2); // Because there are 2 unique genres in the mock response.
  });
});

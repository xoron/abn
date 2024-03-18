import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "../../index";
import SearchView from "./Search.vue";

// Mock fetch response for search results
const mockSearchResults = [
  {
    show: {
      id: "1",
      name: "Mock Show 1",
      rating: { average: 9.0 },
      Image: { medium: "http://example.com/image.jpg" },
    },
  },
  {
    show: {
      id: "2",
      name: "Mock Show 2",
      rating: { average: 9.0 },
      Image: { medium: "http://example.com/image.jpg" },
    },
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockSearchResults),
  })
);

jest.mock("../../atoms/show-image/ShowImage.vue", () => ({
  name: "ShowImage",
  template: '<div><slot /></div>',
}));

describe("SearchView", () => {
  let router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    });
    fetch.mockClear();
  });

  it("fetches and displays search results on component mount", async () => {
    const query = "test";
    router.push(`/search/${query}`);
    await router.isReady();

    const wrapper = mount(SearchView, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.searchResults).toEqual(mockSearchResults);
    expect(wrapper.vm.searchQuery).toBe(query);
  });

  // TODO: fix the issues with why components are not being deep rendered
  xit("navigates to show details page on button click", async () => {
    router.push("/search/test");
    await router.isReady();

    const mockRoute = {
      params: {
        query: "test",
      },
    };

    const wrapper = mount(SearchView, {
      global: {
        mocks: {
          $route: mockRoute,
        },
        plugins: [router],
      },
    });

    expect(wrapper.findAll('[data-test="show-button"]').length).toBeGreaterThan(
      0
    );
    await wrapper.findAll('[data-test="show-button"]')[0].trigger("click");

    expect(router.currentRoute.value.path).toContain(
      `/show/${mockSearchResults[0].show.id}`
    );
  });

  // TODO: fix the issues with why components are not being deep rendered
  xit("renders a ShowImage component for each search result", async () => {
    router.push("/search/test");
    await router.isReady();

    const wrapper = mount(SearchView, {
      global: {
        plugins: [router],
      },
    });

    const showImages = wrapper.find('img')
    expect(showImages).toHaveLength(mockSearchResults.length);
  });
});

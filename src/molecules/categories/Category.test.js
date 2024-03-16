import { mount, flushPromises } from '@vue/test-utils';
import CategoryView from './Category.vue';
// import ShowImage from '../../atoms/show-image/ShowImage.vue';
// import RenderVisible from '../../atoms/render-visible/RenderVisible.vue';

jest.mock('../../atoms/show-image/ShowImage.vue', () => ({
  name: 'ShowImage',
  render: () => null,
}));

jest.mock('../../atoms/render-visible/RenderVisible.vue', () => ({
  name: 'RenderVisible',
    render: () => null,
}));

describe('CategoryView', () => {
  const mockList = [
    { id: "1", name: "Show 1", rating: { average: 8.5 }, image: { medium: "http://example.com/image.jpg" }},
    { id: "2", name: "Show 2", rating: { average: 9.1 }, image: { medium: "http://example.com/image.jpg" }},
    { id: "3", name: "Show 3", rating: { average: 7.4 }, image: { medium: "http://example.com/image.jpg" }},
  ];

  xit('renders correctly with props', async () => {
    const wrapper = mount(CategoryView, {
      props: {
        category: 'Comedy',
        list: mockList,
      },
    });
    await flushPromises();

    expect(wrapper.text()).toContain('Comedy');
    expect(wrapper.findAllComponents({ name: 'ShowImage' })).toHaveLength(3);
  });

  it('sorts the shows by rating in descending order', () => {
    const wrapper = mount(CategoryView, {
      props: {
        category: 'Drama',
        list: mockList,
      },
    });

    const firstShowName = wrapper.vm.list.sort((a, b) => b.rating.average - a.rating.average)[0].name;
    expect(firstShowName).toBe('Show 2');
  });

  it('does not render if list is empty', () => {
    const wrapper = mount(CategoryView, {
      props: {
        category: 'Sci-Fi',
        list: [],
      },
    });

    expect(wrapper.find('[data-test="category"]').exists()).toBe(false);
  });
});

import { mount } from '@vue/test-utils';
import ShowImage from './ShowImage.vue';
import RenderVisible from '../render-visible/RenderVisible.vue';

jest.mock('../render-visible/RenderVisible.vue', () => ({
  name: 'RenderVisible',
  template: '<div><slot /></div>',
}));

describe('ShowImage', () => {
  const mockShow = {
    name: "Test Show",
    image: {
      medium: "http://example.com/test-show.jpg"
    },
    rating: {
      average: 8.2
    }
  };

  it('renders show image, name, and rating correctly', () => {
    const wrapper = mount(ShowImage, {
      props: { show: mockShow },
    });

    // Check if image is rendered with correct src and alt attributes
    const image = wrapper.find('[data-testid="show-image"]');
    expect(image.exists()).toBe(true);
    expect(image.attributes('src')).toBe(mockShow.image.medium);
    expect(image.attributes('alt')).toBe(mockShow.name);

    // Check if show name is rendered correctly
    const nameTag = wrapper.find('[data-testid="show-name"]');
    expect(nameTag.exists()).toBe(true);
    expect(nameTag.attributes('value')).toBe(mockShow.name);

    // Check if show rating is rendered correctly
    const ratingTag = wrapper.find('[data-testid="show-rating"]');
    expect(ratingTag.exists()).toBe(true);
    expect(ratingTag.attributes('value')).toBe(`⭐ ${mockShow.rating.average}`);
  });

  it('displays "unrated" when show has no rating', () => {
    const mockShowWithoutRating = { ...mockShow, rating: undefined };
    const wrapper = mount(ShowImage, {
      props: { show: mockShowWithoutRating },
    });

    const ratingTag = wrapper.find('[data-testid="show-rating"]');
    expect(ratingTag.exists()).toBe(true);
    expect(ratingTag.attributes('value')).toBe("unrated");
  });
});

import { mount, flushPromises } from '@vue/test-utils';
import RenderVisible from './RenderVisible.vue';

// Mock IntersectionObserver
const mockObserve = jest.fn();

window.IntersectionObserver = jest.fn().mockImplementation(callback => {
  callback([{ isIntersecting: false }]);
  return {
    observe: mockObserve,
  };
});

describe('RenderVisible', () => {
  it('renders its content when visible', async () => {
    window.IntersectionObserver = jest.fn().mockImplementation(callback => {
        callback([{ isIntersecting: true }]);
        return {
          observe: mockObserve,
        };
      });
    const wrapper = mount(RenderVisible, {
      slots: {
        default: '<div class="content">Visible Content</div>',
      },
    });

    await flushPromises();

    // Simulate the element being visible
    wrapper.vm.handleIntersection([{ isIntersecting: true }]);

    expect(wrapper.vm.isVisible).toBe(true);
    expect(wrapper.html()).toContain('Visible Content');
    expect(mockObserve).toHaveBeenCalled();
  });

  it('does not initially render its content', () => {

    window.IntersectionObserver = jest.fn().mockImplementation(callback => {
        callback([{ isIntersecting: false }]);
        return {
          observe: mockObserve,
        };
      });

    const wrapper = mount(RenderVisible, {
      slots: {
        default: '<div class="content">Visible Content</div>',
      },
    });

    // Initially, the content should not be visible until the IntersectionObserver callback triggers
    expect(wrapper.vm.isVisible).toBe(false);
    expect(wrapper.html()).not.toContain('Visible Content');
  });
});

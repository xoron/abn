import { mount } from '@vue/test-utils';
import TryAgain from './TryAgain.vue';

describe('TryAgain', () => {
  it('renders the error message', () => {
    const wrapper = mount(TryAgain, {
      props: {
        action: () => {},
      },
    });

    expect(wrapper.text()).toContain('Something went wrong.');
  });

  it('emits an event when the button is clicked', async () => {
    const mockFunction = jest.fn();
    const wrapper = mount(TryAgain, {
      props: {
        action: mockFunction,
      },
    });

    await wrapper.find('[data-test="button"]').trigger('click');
    expect(mockFunction).toHaveBeenCalled();
  });
});
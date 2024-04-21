import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStoryClose: Story = {
	render: () => {
		return (
			<>
				<ArrowButton
					state={false}
					action={function (): void {
						console.log('тестовая функция');
					}}
				/>
			</>
		);
	},
};

export const ArrowButtonStoryOpen: Story = {
	render: () => {
		return (
			<>
				<ArrowButton
					state={true}
					action={function (): void {
						console.log('тестовая функция');
					}}
				/>
			</>
		);
	},
};

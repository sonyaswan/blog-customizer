import { useEffect } from 'react';

type useOutsideCloseFormProps = {
	isFormOpen: boolean;
	rootRef: React.RefObject<HTMLDivElement>;
	onClose?: () => void;
};

export const useOutsideCloseForm = ({
	isFormOpen,
	rootRef,
	onClose,
}: useOutsideCloseFormProps) => {
	useEffect(() => {
		if (!isFormOpen) return;

		const closeByClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!rootRef.current?.contains(target) &&
				document.contains(target)
			) {
				isFormOpen && onClose?.();
			}
		};

		const closeByEscape = (event: KeyboardEvent) => {
			event.key == 'Escape' && onClose?.();
		};

		window.addEventListener('click', closeByClick);
		window.addEventListener('keydown', closeByEscape);

		return () => {
			window.removeEventListener('click', closeByClick);
			window.removeEventListener('keydown', closeByEscape);
		};
	}, [onClose, isFormOpen]);
};

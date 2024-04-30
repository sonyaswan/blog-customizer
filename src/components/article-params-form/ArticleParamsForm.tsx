import { useState, FormEvent, useRef } from 'react';

import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideCloseForm } from './hooks/useOutsideCloseForm';

import clsx from 'clsx';

import {
	ArticleStateType,
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleParams: ArticleStateType;
	setArticleParams: (articleParams: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleParams,
	setArticleParams,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setFormOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState(articleParams);

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideCloseForm({
		isFormOpen,
		rootRef,
		onClose: () => setFormOpen(false),
	});

	function handleParam(value: OptionType, option: keyof ArticleStateType) {
		setFormState((prevState) => ({
			...prevState,
			[option]: value,
		}));
	}

	function handleReset() {
		setFormState(defaultArticleState);
		setArticleParams(defaultArticleState);
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setArticleParams(formState);
	}

	return (
		<div ref={rootRef}>
			<ArrowButton state={isFormOpen} action={() => setFormOpen(!isFormOpen)} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text
						as='h2'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value) => handleParam(value, 'fontFamilyOption')}
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) => handleParam(value, 'fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) => handleParam(value, 'fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value) => handleParam(value, 'backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) => handleParam(value, 'contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};

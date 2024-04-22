import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	const [pageState, setPageState] = useState(defaultArticleState);

	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleParams={pageState}
				setArticleParams={setPageState}
			/>
			<Article />
		</div>
	);
};

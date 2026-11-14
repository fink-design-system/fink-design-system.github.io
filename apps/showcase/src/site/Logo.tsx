/** Wortmarke des Fink Design Systems. */
export function Logo(props: { slot?: string }) {
	return (
		<span className="brand-mark" slot={props.slot} aria-hidden="true">
			<svg viewBox="0 0 24 24" fill="currentColor">
				<path d="M3.5 17.5c2.4-7.4 7.6-11.3 15.6-10.8.9 0 1.4 1 .8 1.6-1.9 1.8-3.2 4.1-3.8 6.9-.2.8-1 1.2-1.8 1-3.1-.8-6.2-.2-9.6 2.1-.7.5-1.5-.1-1.2-.8z" />
				<circle cx="17.2" cy="8.6" r="0.9" fill="var(--fink-color-primary)" />
			</svg>
		</span>
	);
}

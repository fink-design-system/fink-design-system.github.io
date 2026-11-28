import '@fink-ui/react/fink.css';

import type { ReactNode } from 'react';

export const metadata = { title: 'Next.js sample | Fink Design System' };

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}

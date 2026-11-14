import { useMemo } from 'react';
import { ToasterService, type Toast } from '@public-ui/components';

export type FinkToast = Toast;

/** Zeigt Toasts über den KoliBri-ToasterService an. */
export function useToast() {
	return useMemo(
		() => ({
			show: (toast: FinkToast) => ToasterService.getInstance(document).enqueue(toast),
			closeAll: () => ToasterService.getInstance(document).closeAll(),
		}),
		[],
	);
}

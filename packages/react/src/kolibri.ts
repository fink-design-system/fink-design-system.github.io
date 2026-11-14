import { createElement, forwardRef } from 'react';
import type * as Adapter from '@public-ui/react-v19';

/*
 * React-Wrapper für alle KoliBri-Komponenten auf Basis der nativen Custom-Element-Unterstützung von React 19.
 *
 * React 19 setzt Properties eines Custom Elements, bevor es in das Dokument eingehängt wird. Damit liegen
 * komplexe Props wie _options, _links oder _suggestions bereits vor, wenn KoliBri die Komponente initialisiert,
 * und kein Watcher läuft vor componentWillLoad. Der KoliBri-Adapter (@public-ui/react-v19) setzt Props erst
 * nach dem Einhängen; bei bereits geladenen Modulen protokolliert KoliBri 4.5 dann TypeErrors.
 * Die Typen stammen unverändert aus dem offiziellen Adapter.
 */
type AdapterComponents = Omit<typeof Adapter, 'createReactRenderElement' | 'setTagNameTransformer'>;

const wrap = <N extends keyof AdapterComponents>(tag: string, displayName: N): AdapterComponents[N] => {
	const component = forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => createElement(tag, { ...props, ref }));
	component.displayName = displayName;
	return component as unknown as AdapterComponents[N];
};

export const KolAbbr = wrap('kol-abbr', 'KolAbbr');
export const KolAccordion = wrap('kol-accordion', 'KolAccordion');
export const KolAlert = wrap('kol-alert', 'KolAlert');
export const KolAvatar = wrap('kol-avatar', 'KolAvatar');
export const KolBadge = wrap('kol-badge', 'KolBadge');
export const KolBreadcrumb = wrap('kol-breadcrumb', 'KolBreadcrumb');
export const KolButton = wrap('kol-button', 'KolButton');
export const KolButtonLink = wrap('kol-button-link', 'KolButtonLink');
export const KolCard = wrap('kol-card', 'KolCard');
export const KolCombobox = wrap('kol-combobox', 'KolCombobox');
export const KolDetails = wrap('kol-details', 'KolDetails');
export const KolDialog = wrap('kol-dialog', 'KolDialog');
export const KolDrawer = wrap('kol-drawer', 'KolDrawer');
export const KolForm = wrap('kol-form', 'KolForm');
export const KolHeading = wrap('kol-heading', 'KolHeading');
export const KolIcon = wrap('kol-icon', 'KolIcon');
export const KolImage = wrap('kol-image', 'KolImage');
export const KolInputCheckbox = wrap('kol-input-checkbox', 'KolInputCheckbox');
export const KolInputColor = wrap('kol-input-color', 'KolInputColor');
export const KolInputDate = wrap('kol-input-date', 'KolInputDate');
export const KolInputEmail = wrap('kol-input-email', 'KolInputEmail');
export const KolInputFile = wrap('kol-input-file', 'KolInputFile');
export const KolInputNumber = wrap('kol-input-number', 'KolInputNumber');
export const KolInputPassword = wrap('kol-input-password', 'KolInputPassword');
export const KolInputRadio = wrap('kol-input-radio', 'KolInputRadio');
export const KolInputRange = wrap('kol-input-range', 'KolInputRange');
export const KolInputText = wrap('kol-input-text', 'KolInputText');
export const KolKolibri = wrap('kol-kolibri', 'KolKolibri');
export const KolLink = wrap('kol-link', 'KolLink');
export const KolLinkButton = wrap('kol-link-button', 'KolLinkButton');
export const KolMeter = wrap('kol-meter', 'KolMeter');
export const KolModal = wrap('kol-modal', 'KolModal');
export const KolNav = wrap('kol-nav', 'KolNav');
export const KolPagination = wrap('kol-pagination', 'KolPagination');
export const KolPopoverButton = wrap('kol-popover-button', 'KolPopoverButton');
export const KolProgress = wrap('kol-progress', 'KolProgress');
export const KolQuote = wrap('kol-quote', 'KolQuote');
export const KolSelect = wrap('kol-select', 'KolSelect');
export const KolSingleSelect = wrap('kol-single-select', 'KolSingleSelect');
export const KolSkeleton = wrap('kol-skeleton', 'KolSkeleton');
export const KolSkipNav = wrap('kol-skip-nav', 'KolSkipNav');
export const KolSpin = wrap('kol-spin', 'KolSpin');
export const KolSplitButton = wrap('kol-split-button', 'KolSplitButton');
export const KolTableStateful = wrap('kol-table-stateful', 'KolTableStateful');
export const KolTableStateless = wrap('kol-table-stateless', 'KolTableStateless');
export const KolTabs = wrap('kol-tabs', 'KolTabs');
export const KolTextarea = wrap('kol-textarea', 'KolTextarea');
export const KolToolbar = wrap('kol-toolbar', 'KolToolbar');
export const KolTree = wrap('kol-tree', 'KolTree');
export const KolTreeItem = wrap('kol-tree-item', 'KolTreeItem');
export const KolVersion = wrap('kol-version', 'KolVersion');

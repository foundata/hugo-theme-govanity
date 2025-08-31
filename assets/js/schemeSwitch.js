/*
 * Minimal single-button color scheme toggle
 * - Defaults to OS preference (auto) until user clicks
 * - Persists explicit choice in localStorage
 */
(() => {
	const STORAGE_KEY = "hugoGoVanityPreferredColorScheme";
	const ROOT_ATTR = "data-theme";
	const BUNDLE_ID = "script-bundle";
	const TOGGLE_ID = "colorSchemeSwitcher";

	const html = document.documentElement;
	const scriptBundle = document.getElementById(BUNDLE_ID);
	const switchScheme = document.getElementById(TOGGLE_ID);
	if (!switchScheme) return;

	const mql = window.matchMedia("(prefers-color-scheme: dark)");
	const preferred = () => (mql.matches ? "dark" : "light");

	const getStored = () => {
		const v = window.localStorage?.getItem(STORAGE_KEY);
		// Treat "auto" or anything else as not stored
		return v === "dark" || v === "light" ? v : null;
	};

	const setStored = (theme) => {
		try {
			window.localStorage?.setItem(STORAGE_KEY, theme);
		} catch (_) {}
	};

	const updateButtonA11y = (currentTheme) => {
		const textTurnOnLightMode = scriptBundle ? scriptBundle.getAttribute("x-text-turnonlightmode") : "Turn on light mode";
		const textTurnOnDarkMode = scriptBundle ? scriptBundle.getAttribute("x-text-turnondarkmode") : "Turn on dark mode";
		const nextLabel =
			currentTheme === "dark" ? textTurnOnLightMode : textTurnOnDarkMode;
		switchScheme.setAttribute("aria-label", nextLabel);
		switchScheme.setAttribute("title", nextLabel);
		switchScheme.setAttribute(
			"aria-pressed",
			currentTheme === "dark" ? "true" : "false",
		);
		// Optional hook for styling the icon based on current theme
		switchScheme.dataset.theme = currentTheme;
	};

	const applyTheme = (theme, persist) => {
		html.setAttribute(ROOT_ATTR, theme);
		if (persist) setStored(theme);
		updateButtonA11y(theme);
	};

	// Initialize
	const stored = getStored();
	if (stored) {
		applyTheme(stored, false);
	} else {
		// Follow OS until user picks
		applyTheme(preferred(), false);
		mql.addEventListener?.("change", () => {
			if (!getStored()) applyTheme(preferred(), false);
		});
	}

	// Toggle on click (light <-> dark). Prevent default anchor navigation.
	switchScheme.addEventListener("click", (ev) => {
		ev.preventDefault();
		const current = html.getAttribute(ROOT_ATTR) || preferred();
		const next = current === "dark" ? "light" : "dark";
		applyTheme(next, true); // persist explicit choice
	});

	// Optional: keyboard space activation for accessibility on <a>
	switchScheme.addEventListener("keydown", (ev) => {
		if (ev.code === "Space" || ev.key === " ") {
			ev.preventDefault();
			switchScheme.click();
		}
	});

	// Expose a tiny API in case you ever want to reset to "auto":
	window.picoTheme = {
		get current() {
			return html.getAttribute(ROOT_ATTR);
		},
		resetToAuto() {
			try {
				window.localStorage?.removeItem(STORAGE_KEY);
			} catch (_) {}
			applyTheme(preferred(), false);
		},
	};
})();

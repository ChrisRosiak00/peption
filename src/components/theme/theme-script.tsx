/**
 * Inline script that runs BEFORE React hydration to prevent
 * flash-of-wrong-theme. Reads localStorage; falls back to system.
 */
export function ThemeScript() {
  const code = `
(function () {
  try {
    var t = localStorage.getItem('peption:theme');
    var m = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolved = t === 'dark' || t === 'light' ? t : (m ? 'dark' : 'light');
    if (resolved === 'dark') document.documentElement.classList.add('dark');
    document.documentElement.dataset.theme = resolved;
  } catch (_) {}
})();
  `.trim();
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

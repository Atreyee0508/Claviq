const roots = [document.querySelector('#liquid-cloth-root')].filter(Boolean);

if (roots.length) {
  Promise.all([
    import('react-dom/client'),
    import('./LiquidCloth.jsx'),
  ]).then(([{ createRoot }, { default: LiquidCloth }]) => {
    roots.forEach((root) => {
      createRoot(root).render(<LiquidCloth activationClass={root.dataset.activationClass || 'is-ready'} />);
    });
  });
}

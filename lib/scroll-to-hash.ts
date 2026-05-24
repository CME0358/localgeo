export function getHashFromHref(href: string): string | null {
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) return null;
  const hash = href.slice(hashIndex + 1);
  return hash || null;
}

export function isHashHref(href: string): boolean {
  return href.startsWith('#') || getHashFromHref(href) !== null;
}

export function scrollToHash(
  hash: string,
  behavior: ScrollBehavior = 'smooth',
): boolean {
  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!id) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({ behavior, block: 'start' });
  window.history.replaceState(null, '', `#${id}`);
  return true;
}

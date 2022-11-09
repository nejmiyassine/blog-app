export const getText = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent;
};

export const shortText = (text: string, num: number) =>
  text.length > num ? getText(text)?.substring(0, num) + '...' : getText(text);

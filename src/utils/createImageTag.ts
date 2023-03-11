export const createImageTag = (src: string, alt: string) => {
  const img = `<img src='${src}' alt='${alt} avatar' />`;

  return img;
};

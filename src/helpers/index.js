export const slugify = text =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')


// Check whether an object is empty
export const isEmpty = (obj) => {
  for (let key in obj) {
      if (obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

export const o_O = (promise) => {
  return promise.then(data => {
      if(data instanceof Error) return [data]
      return [null, data]
  }).catch(err => [err])
}

export const goBack = () => window.history.go(-1);
export const isUrl = (url) => window.route().current(url);
export const goForward = () => window.history.go(1);
// Create Url Slug
export function createSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaaaeeeeiiiioooouuuunc------";

  let i = 0, l = from.length;
  for (; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-") // collapse dashes
      .replace(/^-+/, "") // trim - from start of text
      .replace(/-+$/, ""); // trim - from end of text

  return str;
}
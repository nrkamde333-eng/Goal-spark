type ClassValue = ClassValue[] | string | number | boolean | null | undefined | { [key: string]: any };

function toVal(mix: ClassValue): string {
  let k: string;
  let y: string;
  let str = "";

  if (!mix) return "";

  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      const len = mix.length;
      for (let i = 0; i < len; i++) {
        if (mix[i]) {
          if ((y = toVal(mix[i]))) {
            if (str) str += " ";
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          if (str) str += " ";
          str += k;
        }
      }
    }
  }

  return str;
}

export function clsx(...inputs: ClassValue[]): string {
  let i = 0;
  let tmp: ClassValue;
  let x: string;
  let str = "";
  const len = inputs.length;
  for (; i < len; i++) {
    if ((tmp = inputs[i])) {
      if ((x = toVal(tmp))) {
        if (str) str += " ";
        str += x;
      }
    }
  }
  return str;
}

export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}



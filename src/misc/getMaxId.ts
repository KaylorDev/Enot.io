export function getMaxId(arr: { id: number }[]) {
  return arr.length > 0
    ? arr.reduce((prev, current) => {
        if (+current.id > +prev.id) {
          return current;
        } else {
          return prev;
        }
      }).id
    : 0;
}

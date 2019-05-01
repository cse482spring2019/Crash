const applyFn = (state, fn) => fn(state);
export const pipe = (fns, state) => state.withMutations(s => fns.reduce(applyFn, s));

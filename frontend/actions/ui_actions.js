export const RECEIVE_DONE_LOADING = "RECEIVE_DONE_LOADING";
export const RECEIVE_NEEDS_LOADING = "RECEIVE_NEEDS_LOADING";

export const doneLoading = () => (
  {
    type: RECEIVE_DONE_LOADING
  }
)

export const needsLoading = () => (
  {
    type: RECEIVE_NEEDS_LOADING
  }
)

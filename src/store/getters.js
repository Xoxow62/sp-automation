export const isTokenValid = state => {
  if (!state.token || !state.token.FormDigestValue) {
    return false
  }
  const dateString = state.token.FormDigestValue.split(',')[1]
  if (!dateString) {
    return false
  }
  return state.token && new Date(dateString).setSeconds(state.token.FormDigestTimeoutSeconds) >= new Date()
}

export const visibleLists = state => {
  return state.lists.filter(i => !i.Hidden)
}

export const formatDate = (date: Date) => date.toLocaleDateString('ru', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
})

export function formatAmount(value) {
  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  
  return value
}

export function formatDate(date) {
  const splittedDate = date.split("-")

  return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
}
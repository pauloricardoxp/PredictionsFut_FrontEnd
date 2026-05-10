export const formatTime = (isoString: string | null | undefined): string => {
  if (!isoString) return '--:--'
  const date = new Date(isoString)
  return date.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatDate = (isoString: string | null | undefined): string => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
  })
}

export const formatDateTime = (isoString: string | null | undefined): string => {
  if (!isoString) return ''
  return `${formatDate(isoString)} ${formatTime(isoString)}`
}
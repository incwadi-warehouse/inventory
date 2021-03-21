export default function useReservationShow() {
  const localeDateString = (data) => {
    let date = new Date(data * 1000)
    return date.toLocaleString()
  }

  return { localeDateString }
}

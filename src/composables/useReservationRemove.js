import { remove as removeAction } from './../api/reservation'

export default function useReservationRemove(emit) {
  const remove = (id) => {
    removeAction(id).then(() => {
      emit('removed')
    })
  }

  return { remove }
}

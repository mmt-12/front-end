import { useModal as useSamModal } from 'sam-react-modal'

import Alert from '@/components/modal/Alert'
import Confirm from '@/components/modal/Confirm'

export const useModal = () => {
  const { openModal, closeModal } = useSamModal()

  const confirm = async (message: string) => {
    return openModal(<Confirm>{message}</Confirm>)
  }

  const alert = async (message: string) => {
    return openModal(<Alert>{message}</Alert>)
  }

  return { openModal, closeModal, confirm, alert }
}

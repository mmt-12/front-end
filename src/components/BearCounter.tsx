import { useBearStore } from '@/store/bearStore'

export default function BearCounter() {
  const increaseBear = useBearStore(state => state.increase)
  return (
    <div>
      <button onClick={() => increaseBear(1)}>add 1 bear</button>
      <button onClick={() => increaseBear(10)}>add 10 bears</button>
    </div>
  )
}

import { useTest } from '@/api/test'

export default function TestPage() {
  const { data } = useTest()
  return <>Test Page {data?.message}</>
}

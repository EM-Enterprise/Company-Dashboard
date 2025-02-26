import HellocashApi from '@em-enterprise/hellocash-api'
import env from '@/lib/root/Environment'

export default function getHellocashAPI() {
  return new HellocashApi(env.HELLOCASH_TOKEN)
}

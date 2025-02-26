import HellocashApi from '@em-enterprise/hellocash-api'

export default function getHellocashAPI() {
  if (!process.env.HELLOCASH_TOKEN) throw new ReferenceError('Missing HelloCash Authorization Token')

  return new HellocashApi(process.env.HELLOCASH_TOKEN)
}

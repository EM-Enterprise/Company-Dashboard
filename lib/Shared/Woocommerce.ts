'use server'
import env from '@/lib/root/Environment'
import Woocommerce from '@em-enterprise/woocommerce-utils'

export default async function getWoocommerceApi() {
  const woocommerce = new Woocommerce({
    url: env.WOOCOMMERCE_DOMAIN,
    consumerKey: env.WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: env.WOOCOMMERCE_CONSUMER_SECRET,
  })

  return woocommerce
}

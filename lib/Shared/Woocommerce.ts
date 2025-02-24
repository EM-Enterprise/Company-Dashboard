'use server'
import Woocommerce from '@em-enterprise/woocommerce-utils'

export default async function getWoocommerceApi() {
  if (!process.env.WOOCOMMERCE_CONSUMER_KEY) throw new Error('Missing WOOCOMMERCE_CONSUMER_KEY')
  if (!process.env.WOOCOMMERCE_CONSUMER_SECRET) throw new Error('Missing WOOCOMMERCE_CONSUMER_SECRET')
  if (!process.env.WOOCOMMERCE_DOMAIN) throw new Error('Missing WOOCOMMERCE_DOMAIN')

  const woocommerce = new Woocommerce({
    url: process.env.WOOCOMMERCE_DOMAIN,
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  })

  return woocommerce
}

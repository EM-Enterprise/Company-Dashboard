import { NextResponse } from 'next/server'
import getWoocommerceApi from '@/lib/Shared/Woocommerce'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams
  const limit = parseInt(params?.get('limit')?.toString() ?? '25')

  if (limit > 100) return new Response('Limit must be less than or equal to 100', { status: 400 })

  const { getOrders } = await getWoocommerceApi()
  const orders = await getOrders({ per_page: limit })

  return NextResponse.json(orders)
}

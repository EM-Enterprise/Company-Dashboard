import getHellocashAPI from '@/lib/Shared/HelloCash'
import { notFound } from 'next/navigation'
import useBackend from '@/hooks/Shared/Fetch/useBackend'
import InvoiceHistoryFeed from '@/components/Shared/Feeds/History/InvoiceHistoryFeed'
import { Invoice } from '@em-enterprise/hellocash-api/schemas/invoice/Invoice'

export default async function CustomerHistoryPage({ params }: { params: { cid?: string } }) {
  let invoices = await useBackend<Invoice[]>('/invoices?limit=-1', { next: { revalidate: 3600 * 24, tags: ['invoices'] } })

  if (!params.cid) return notFound()
  const { findExactCustomer } = getHellocashAPI()
  const customer = await findExactCustomer({ id: params.cid }).then((customers) => customers.at(0))

  if (!customer) return <div>Customer not found</div>

  invoices = invoices.filter((i) => i.customer?.id == customer.id)

  return <InvoiceHistoryFeed invoices={invoices} />
}

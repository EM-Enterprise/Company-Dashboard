import useBackend from '@/hooks/Shared/Fetch/useBackend'
import Table from '@/components/Shared/Table/Table'
import ShowArticleHistoryButton from '@/components/articles/ShowArticleHistoryButton'
import { Article } from '@em-enterprise/hellocash-api/schemas/article/Article'
import { ArticleCategory } from '@em-enterprise/hellocash-api/schemas/article/category/ArticleCategory'

export default async function ArticlesPage() {
  const articles = await useBackend<Article[]>('/articles', { next: { revalidate: 3600, tags: ['articles'] } })
  const categories = await useBackend<ArticleCategory[]>('/categories', { next: { revalidate: 3600, tags: ['categories'] } })

  //? This replaces the category id with the category name for each article
  const shownArticles: (Omit<Article, 'category'> & { category?: string })[] = articles.map((a) => ({
    ...a,
    category: categories.find((c) => c.id === a.category_id)?.name,
  }))

  return (
    <div className='gap4 flex flex-col'>
      <h1 className='mb-6 text-2xl font-semibold'>Articles</h1>

      <Table<(typeof shownArticles)[number]>
        allowSelection={true}
        selectionButtons={<ShowArticleHistoryButton />}
        labels={{ id: 'ID', name: 'Name', category: 'Category' }}
        visibilities={{ id: 'hidden min-w-24 @xl:table-cell', name: 'w-[100%]', category: 'hidden text-nowrap pr-4 text-right @3xl:table-cell whitespace-nowrap' }}
        noDefaultLabels
        items={shownArticles}
        searchFilter={['name', 'category']}
      />
    </div>
  )
}

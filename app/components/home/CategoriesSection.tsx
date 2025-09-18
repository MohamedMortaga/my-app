import { getCategories } from '@/app/services/categories.service'
import CategoriesSlider from './CategoriesSlider'
import SectionTitle from '../shared/SectionTitle'

export default async function CategoriesSection() {
  const { data: categories } = await getCategories()
  return (
    <section className="py-10 flex justify-center">
      <div className="container px-25">
        <SectionTitle title="Categories" sub="Browse our categories" />
        <CategoriesSlider categories={categories} />
      </div>
    </section>
  )
}

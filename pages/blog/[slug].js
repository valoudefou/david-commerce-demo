import Link from 'next/link'
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import { createClient } from 'contentful'

const client = createClient({
space: 'mwr46hk1hvcf',
accessToken: 'P7e2zlwtUe4ZDhEuBW9cQ8ma8ViKddL3f1oYrfCHbdk',
})

export const getStaticPaths = async () => {
const res = await client.getEntries({
content_type: 'articles'
})

const paths = res.items.map(item => {
return {
params: {slug: item.fields.slug}
}
}
)

return {
paths,
fallback: false
}
}
export async function getStaticProps({params}) {
const {items} = await client.getEntries({
content_type: 'articles',
'fields.slug': params.slug,
})

return {
props: {articles: items[0]}
}
}
export default function Article({articles}) {
console.log(articles)

return (
<div className="flex flex-col p-4">
<h1 className="text-4xl p-5 place-self-center font-semibold">{articles.fields.titleV2}</h1>
<h2 className="text-2xl p-5 font-medium">{articles.fields.title}</h2>
<div className='flex '>
<p className="p-5 text-justify">{articles.fields.content}</p>
<div className="divider divider-horizontal"></div>
<p className="p-5 text-justify">{articles.fields.content}</p>
</div>
</div>
)
}
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Widget from 'components/widget'
import axios from 'axios';
import { getServerSidePropsWrapper} from '@auth0/nextjs-auth0'
import { getSession} from '@auth0/nextjs-auth0'

const MAX_DISPLAY = 10
export const getServerSideProps = getServerSidePropsWrapper(async (ctx) => {
  const session = getSession(ctx.req, ctx.res);
  const posts = await getAllFilesFrontMatter('blog');
  const url = 'https://api.devrev.ai/token';
  const appToken = process.env.DEVREV_PLUG_TOKEN
  if (session) {
    const headers = {
      Authorization: appToken,
    };
    const response = await axios.post(
      url,
      {
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        subject_token: JSON.stringify({email:session.user.email, display_name:session.user.given_name, external_uid:session.user.sid}),
        subject_token_type: 'urn:devrev:params:oauth:token-type:userinfo',
        requested_token_type: 'urn:devrev:params:oauth:token-type:session',
      },
      { headers },
    );
    const sessionToken = response.data['access_token'];
    return {props: {
      posts: posts, sessionToken: sessionToken, user: session.user
    }};
  } else {
    const headers = {
      Authorization: appToken,
    };
    const response = await axios.post(
      url,
      {
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        subject_token: JSON.stringify({email:"Example@email.com", display_name:"Guest User"}),
        subject_token_type: 'urn:devrev:params:oauth:token-type:userinfo',
        requested_token_type: 'urn:devrev:params:oauth:token-type:session',
      },
      { headers },
    );
    const sessionToken = response.data['access_token'];
    return {props: {
      posts: posts, sessionToken: sessionToken, user: null,
    }};
  }
});

export default function Home({ posts, sessionToken, user }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Widget token={sessionToken}></Widget>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            DevRev PLG Starter
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
        </div>
      )}
    </>
  )
}

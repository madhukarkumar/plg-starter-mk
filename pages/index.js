import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Widget from 'components/widget'
import axios from 'axios';
import { getServerSidePropsWrapper, useUser } from '@auth0/nextjs-auth0'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import NewsletterForm from '@/components/NewsletterForm'
import { GetServerSideProps } from 'next'

const MAX_DISPLAY = 10

// export async function getStaticProps() {
//   const posts = await getAllFilesFrontMatter('blog')
  // const url = 'https://api.devrev.ai/token'

  // // Details of the RevUser.

// export const getServerSideProps = getServerSidePropsWrapper({async (ctx) => {
//     const posts = await getAllFilesFrontMatter('blog')
//     const session = getSession(ctx.req, ctx.res);

  //   const url = 'https://api.devrev.ai/token'

  // // Details of the RevUser.

  // const appToken = "eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHA6Ly9zdHMuZGV2cmV2LmFpIiwia2lkIjoic3RzX2tpZF9yc2EiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiamFudXMiXSwiZXhwIjoxNjY2MjM3MTc4LCJodHRwOi8vZGV2cmV2LmFpL2NsaWVudGlkIjoiMVRIN1QyIiwiaHR0cDovL2RldnJldi5haS9kZXZvaWQiOiJERVYtNVJPd3kxMEQiLCJodHRwOi8vZGV2cmV2LmFpL3N2Y2FjYyI6ImRvbjppZGVudGl0eTpkdnJ2LXVzLTE6ZGV2by81Uk93eTEwRDpzdmNhY2MvMVRIN1QyIiwiaHR0cDovL2RldnJldi5haS90b2tlbnR5cGUiOiJ1cm46ZGV2cmV2OnBhcmFtczpvYXV0aDp0b2tlbi10eXBlOmFhdCIsImlhdCI6MTY2MzgxNzk3OCwiaXNzIjoiaHR0cDovL3N0cy5kZXZyZXYuYWkiLCJqdGkiOiJkb246aWRlbnRpdHk6ZHZydi11cy0xOmRldm8vNVJPd3kxMEQ6dG9rZW4vTVcxRlZQc3MiLCJzdWIiOiJkb246aWRlbnRpdHk6ZHZydi11cy0xOmRldm8vNVJPd3kxMEQ6c3ZjYWNjLzFUSDdUMiJ9.X6kKBzb1JVj-HpEcbHV5tGAN_9-pL2RpMm4qK-fqUVJnYOlk1oUba2-0d0U8TPcwCUknuJhBevTrmIU28NXeCN7mqIDvCz6BUVlHuPgEjffX7Go0z73D8sLsjsDl6oWKGvGq68DupyBk-xd1necM7uzWuI3dNXrji7EF5IZHvJi4k1wmLusJq7eiXR8j7saBF8Ud9mVBVTB0TAsP7Q9W7SwfWkRRVulxAvzeCai2h-ibnbv6o5eXZnOouLwEpCBWy1ls7HW0rMk3NeYf5Q83AlFxvlTCNg0bjg3nWgBaJyVb_54CItWy4q5oQJNLJ-v8wJKWAeHpPIefrpFR5CNl1g";
//   // const sessionToken = appToken;
//   console.log(session.user)
  // const headers = {
  //   Authorization: appToken,
  // };
  // const response = await axios.post(
  //   url,
  //   {
  //     grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
  //     // subject_token: JSON.stringify({email:session.user.email, display_name:session.user.given_name, external_uid:session.user.sid}),
  //     subject_token: JSON.stringify({email:"email3433@gmail.com", display_name:session.user.nickname}),
  //     subject_token_type: 'urn:devrev:params:oauth:token-type:userinfo',
  //     requested_token_type: 'urn:devrev:params:oauth:token-type:session',
  //   },
  //   { headers },
  // );
  // const sessionToken = response.data['access_token'];
//     //check the console of backend, you will get tokens here
    // return {props: {
    //   posts: posts, sessionToken: sessionToken, user: session.user
    // }};
//   }
// });
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
        // subject_token: JSON.stringify({email:, display_name:session.user.nickname}),
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
        // subject_token: JSON.stringify({email:session.user.email, display_name:session.user.given_name, external_uid:session.user.sid}),
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

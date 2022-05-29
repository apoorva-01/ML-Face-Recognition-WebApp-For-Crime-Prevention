import { FC, useContext } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { DataStore } from "../../../utils/DataStore";
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PhoneIcon from '@mui/icons-material/Phone';
interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'About',
    url: '/about',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { state } = useContext(DataStore);
  const { storeInfo } = state;
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accent-2 py-12 text-primary bg-primary transition-colors duration-150">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <Logo />
              </a>
            </Link>


            {storeInfo?.address.city ? (
              <a href={`/`} className={s.link}><AddLocationAltIcon /> &nbsp;{storeInfo.address.city}</a>
            ) : null}
            <br />
            {storeInfo?.phone ? (
              <a href={`tel:${storeInfo.phone}`} className={s.link}><PhoneIcon /> &nbsp;{storeInfo.phone}</a>
            ) : null}

          </div>

          <div className="col-span-1 lg:col-span-8">
            <div className="grid md:grid-rows-4 md:grid-cols-3 md:grid-flow-col">
              {[...links, ...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </span>
              ))}
              {storeInfo?.policies?.RefundPolicyHtml ? (
                <span className="py-3 md:py-0 md:pb-4">
                  <Link href={'/policies/refund-policy'}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      Refund Policy
                    </a>
                  </Link>
                </span>
              ) : null}
              {storeInfo?.policies?.PrivacyPolicyHtml ? (
                <span className="py-3 md:py-0 md:pb-4">
                  <Link href={'/policies/privacy-policy'}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      Privacy Policy
                    </a>
                  </Link>
                </span>
              ) : null}
              {storeInfo?.policies?.ShippingPolicyHtml ? (
                <span className="py-3 md:py-0 md:pb-4">
                  <Link href={'/policies/shipping-policy'}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      Shipping Policy
                    </a>
                  </Link>
                </span>
              ) : null}
              {storeInfo?.policies?.TermsOfServiceHtml ? (
                <span className="py-3 md:py-0 md:pb-4">
                  <Link href={'/policies/terms-of-services'}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      Terms Of Services
                    </a>
                  </Link>
                </span>
              ) : null}
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 flex items-start lg:justify-end text-primary">
            <div className="flex space-x-6 items-center h-10">

              {storeInfo ? (
                <>


                  {storeInfo.socialMediaLinks?.github ? (
                    <a
                      className={s.link}
                      aria-label="Github"
                      href={storeInfo.socialMediaLinks?.github}>
                      <Github />
                    </a>
                  ) : null}
                  {storeInfo.socialMediaLinks?.instagram ? (
                    <a
                      className={s.link}
                      aria-label="Instagram"
                      href={storeInfo.socialMediaLinks?.instagram}
                    >
                      <InstagramIcon />
                    </a>
                  ) : null}
                  {storeInfo.socialMediaLinks?.facebook ? (
                    <a
                      className={s.link}
                      aria-label="Facebook"
                      href={storeInfo.socialMediaLinks?.facebook}
                    >
                      < FacebookIcon />
                    </a>
                  ) : null}
                  {storeInfo.socialMediaLinks?.twitter ? (

                    <a
                      className={s.link}
                      aria-label="Twitter"
                      href={storeInfo.socialMediaLinks?.twitter}
                    >
                      < TwitterIcon />
                    </a>
                  ) : null}

                </>
              ) : null}



              {/* <I18nWidget /> */}
            </div>
          </div>
        </div>
        <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm">
          <div>
            <span>Powered By &copy;<Link href='https://makemycommerce.in/'><a> Make My Commerce</a></Link> </span>
          </div>
          <div className="flex items-center text-primary text-sm">
            <span className="text-primary">All Right Reserved  @&nbsp;</span>
            <Link href="/">
              <a
                rel="noopener noreferrer"
                className="text-primary"
              >
                <Logo />
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer

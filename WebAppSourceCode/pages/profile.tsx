import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import { useContext } from 'react';
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import { Bag, Cross, Check, MapPin, CreditCard } from '@components/icons'
import { DataStore } from '../utils/DataStore';
export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}

export default function Profile() {
  const { state } = useContext(DataStore);
  const { customerInfo } = state;
  return (
    <Container>
      {customerInfo && (
        <>
          <Text variant="pageHeading">Hi, {customerInfo.name}! </Text>
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-6 pr-4">
              <div>
                <Text variant="sectionHeading">Name</Text>
                <span>
                  {customerInfo.name}
                </span>
              </div>
              <div className="mt-5">
                <Text variant="sectionHeading">Email</Text>
                <span>{customerInfo.email}</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              {/* Address */}
              {customerInfo.address ? (
                <>
                  <div className="rounded-md border border-accent-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accent-4">
                    <div className="mr-5">
                      <MapPin />
                    </div>
                    <div className="text-sm text-center font-medium">
                      <span>
                        1046 Kearny Street.<br />
                        San Franssisco, California
                      </span>
                    </div>
                  </div>
                </>
              ) : (<>
                <Text variant="sectionHeading">No Saved Addresses</Text>
                <div className="rounded-md border border-accent-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accent-4">
                  <div className="mr-5">
                    <MapPin />
                  </div>
                  <div className="text-sm text-center font-medium">
                    <span className="uppercase">+ Add Shipping Address</span>
                  </div>
                </div>
              </>)}

              {/* Payment */}
              {customerInfo.payment ? (
                <>
                  <div className="rounded-md border border-accent-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accent-4">
                    <div className="mr-5">
                      <CreditCard />
                    </div>
                    <div className="text-sm text-center font-medium">
                      <span className="uppercase">+ Add Payment Method</span>
                      <span>VISA #### #### #### 2345</span>
                    </div>
                  </div>
                </>
              ) : (<>
                <Text variant="sectionHeading">No Saved Payment Methods</Text>
                <div className="rounded-md border border-accent-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accent-4">
                  <div className="mr-5">
                    <CreditCard />
                  </div>
                  <div className="text-sm text-center font-medium">
                    <span className="uppercase">+ Add Payment Method</span>
                    {/* <span>VISA #### #### #### 2345</span> */}
                  </div>
                </div>
              </>)}

            </div>
          </div>


        </>
      )}
    </Container>
  )
}

Profile.Layout = Layout

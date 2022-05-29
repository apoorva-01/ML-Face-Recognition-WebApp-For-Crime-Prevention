import React, { useContext,useEffect } from "react";
import Layout from "../../../layouts/Layout/Layout";
import { useRouter } from 'next/router';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
export default function SEO() {
    const { state, dispatch } = useContext(AdminDataStore);
    const { adminStoreInfo } = state;
    const router = useRouter();

    useEffect(() => {
      if (!adminStoreInfo) {
          router.push('/admin/login');
      }
  }, [router,adminStoreInfo]);
    return (
        <Layout>
        </Layout>

    )
}

import React, { useState, useContext } from "react";
import styles from '../../../styles/admin/google-mockup.module.css'
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import Stack from '@mui/material/Stack';
import Image from 'next/image'
export default function GoogleSearchMockup() {
    const { state} = useContext(AdminDataStore);
    const { user } = state;
    return (
        <>
            <Container  justify="center" align="center">
                <div className="logo">
                    <Image alt="Google" width="100" height="100" src="/admin/google.png" />
                </div>
            </Container>
            <div className={styles.bar}>
                <input className={styles.searchbar} type="text" title="Search" />
                <Image alt="Google" width="50" height="50" className={styles.voice} src="/admin/Google_mic.svg.webp" title="Search by Voice" />
            </div>

            <Container >
                <div className={styles.result}>
                    <div style={{ wordWrap: 'break-word', wrap: "hard" }} className={styles.collapse}>
                        <a href={`${process.env.PROD_URL}/${user.username}`}>
                            {/* <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>{metaTitle}</h3> */}
                        </a>
                        <div className={styles.url}>
                            <p>{process.env.PROD_URL}/{user.username}
                            </p>
                        </div>
                    </div>
                    {/* <p>{metaDescription}</p> */}
                </div>
                <Stack spacing={3}>
                    <Stack>
                        <Skeleton variant="text" width={160} height={20} />
                        <Skeleton variant="text" width={200} height={50} />
                    </Stack>
                    <Stack>
                        <Skeleton variant="text" width={160} height={20} />
                        <Skeleton variant="text" width={260} height={50} />
                    </Stack>
                    <Stack>
                        <Skeleton variant="text" width={160} height={20} />
                        <Skeleton variant="text" width={190} height={50} />
                    </Stack>
                </Stack>
            </Container>
        </>
    )
}

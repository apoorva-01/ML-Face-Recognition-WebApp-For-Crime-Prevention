import commerce from '@lib/api/commerce'
import { Bag } from '@components/icons'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useContext, useReducer } from 'react';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  TableContainer,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
 
} from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';
import { DataStore } from '../../utils/DataStore';
import useStyles from '../../utils/styles';
import { Button } from '@components/ui'




export default function RefundPolicy() {
  const { state } = useContext(DataStore);
  const router = useRouter();
  const { storeInfo } = state;


  useEffect(() => {
    if (!storeInfo) {
      router.push('/login');
    }

  }, [storeInfo, router]);
  return (
<>

<Typography component='p'align='center' variant='h4'><b>Refund Policy</b></Typography>
<Typography component='p'align='center' variant='h6'>{storeInfo?.policies?.RefundPolicyHtml}</Typography>

</>
  )
}

RefundPolicy.Layout = Layout

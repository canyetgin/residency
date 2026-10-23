'use client';

import { lazy } from 'react';

// lazy-load the full error so it's only downloaded when an error occurs
export default lazy(() => import('../../components/error'));

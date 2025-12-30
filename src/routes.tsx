import { lazy } from 'react'
const PageA = lazy(() => import('@/pages/pageA'))
const PageB = lazy(() => import('@/pages/pageB'))


const routes: Shared.IRoute[] = [{
    path: '/test/a', component: PageA
}, {
    path: '/test/b', component: PageB
}]

export default routes
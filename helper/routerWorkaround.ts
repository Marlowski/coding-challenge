// Workaround for: Warning: React Hook useEffect has a missing dependency: 'router'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
// https://github.com/vercel/next.js/issues/18127#issuecomment-950907739
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { useRef, useState } from 'react'

export default function usePush(): NextRouter['push'] {
    const router = useRouter()
    const routerRef = useRef(router)

    routerRef.current = router

    const [{ push }] = useState<Pick<NextRouter, 'push'>>({
        push: path => routerRef.current.push(path),
    })

    return push
}
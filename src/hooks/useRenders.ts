import { useRef } from 'react';

export const useRenders = () => {
    const render = useRef(0)

    console.log(render.current++)

}

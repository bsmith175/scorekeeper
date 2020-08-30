import * as React from 'react';
import { doFetch } from '../../Util/Util';


export default function useQuery(endpoint) {
    const [state, setState] = React.useReducer(
        (state, newState) => ({...state, ...newState}),
        {data: null, loading: null, error: null}
      );

    function reQuery() {
        setState({loading: true});
        doFetch('GET', endpoint).then((value) => {
        setState({data: value.response, loading: false, error: value.error})
        });
    }
    React.useEffect(() => {
        let isMounted = true;

        if (isMounted) setState({loading: true});

        doFetch('GET', endpoint).then((value) => {
            if (isMounted) setState({data: value.response, loading: false, error: value.error})
        });
        //cleanup function
        return  () => isMounted = false;
    }, []);

    return {...state, reQuery: reQuery};
}
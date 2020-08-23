import * as React from 'react';
import { doFetch } from '../../Util/Util';


export default function useQuery(endpoint) {
    const [state, setState] = React.useReducer(
        (state, newState) => ({...state, ...newState}),
        {data: null, loading: null, error: null}
      );

    function query() {
        setState({loading: true});
        doFetch('GET', endpoint).then((value) => {

            setState({data: value.response, loading: false, error: value.error})
        });
    }
    React.useEffect(() => {
        query();
    }, []);

    return {...state, reQuery: query};
}
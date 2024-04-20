import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://vortex.korabli.su/api/graphql/glossary/',
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            origin: 'http://localhost',
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

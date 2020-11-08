import MessagesService from '../services/messages.service';

export const messages = {
    state: {
        conversations: []
    },
    mutations: {
        conversations_loaded(state, conversations){
            state.conversations = conversations;
        },
    },
    actions: {
        getConversations({commit}) {
            return MessagesService.getConversations().then(
                (conversations) => {
                    commit('conversations_loaded', conversations);
                    return Promise.resolve();
                }
            )
        },
        subscribeToNewMessage({dispatch}) {
            return MessagesService.getNewMessage().then(
                () => {
                    // update conversations
                    dispatch('getConversations', null, {root: true});

                    // todo: update current conversation messages

                    // recursive call
                    dispatch('subscribeToNewMessage', null, {root: true});
                    return Promise.resolve();
                }
            )
        }
    },
    getters : {
        conversations: state => {
            return state.conversations;
        }
    }
};
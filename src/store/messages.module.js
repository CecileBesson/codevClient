import MessagesService from '../services/messages.service';
import AppointmentsService from '../services/appointments.service';
import router from '../router/index'

export const messages = {
    state: {
        conversations: [],
        totalUnreadMessages: 0,
        currentConversationMessages: [],
        conversation: null,
        appointmentsForCurrentConversation: []
    },
    mutations: {
        conversations_loaded(state, conversations){
            state.conversations = conversations;
            var cpt = 0;
            conversations.forEach(element => cpt += element.unreadMessagesNumber);
            state.totalUnreadMessages = cpt;
        },
        current_conversation_loaded(state, payload) {
            state.currentConversationMessages = payload.conv;
            state.conversation = payload.conversation;
        },
        current_appointments_loaded(state, appointments) {
            state.appointmentsForCurrentConversation = appointments;
        }
    },
    actions: {
        getConversations({commit}) {
            return MessagesService.getConversations().then(
                (conversations) => {
                    commit('conversations_loaded', conversations);
                    return Promise.resolve();
                }
            )
            // todo: catch errors
        },
        subscribeToNewMessage({dispatch, state}) {
            return MessagesService.getNewMessage().then(
                () => {
                    // update conversations
                    if(router.currentRoute.name === "conversation") {
                        dispatch('getCurrentConversation', state.conversation.service.idService, {root: true});
                    }
                    else {
                        dispatch('getConversations', null, {root: true});
                    }

                    // recursive call
                    dispatch('subscribeToNewMessage', null, {root: true});
                    return Promise.resolve();
                }
            )
        },
        async getCurrentConversation({commit, state, dispatch}, idService) {
            await dispatch('getConversations', null, {root: true});
            var idUser1 = null, idUser2 = null, conversation = null;
            state.conversations.forEach(conv => {
                if (conv.service.idService == idService) {
                    idUser1 = conv.idUser1;
                    idUser2 = conv.idUser2;
                    conversation = conv;
                }
            });
            return MessagesService.getCurrentConversation(idService, idUser1, idUser2).then(
                conversationMessages => {
                    commit('current_conversation_loaded', { conv: conversationMessages, conversation: conversation});
                    dispatch('getConversations', null, {root: true});
                    return Promise.resolve();
                },
                () => {
                    // todo catch error omggggg
                }
            )
        },
        loadAppointmentsForCurrentConversation({state, commit}, idUser) {
            return AppointmentsService.getAppointmentsForConversation(state.conversation.service.idService, idUser).then(
                appointments => {
                    commit("current_appointments_loaded", appointments);
                }
            );
        },
        deleteAppointment({dispatch, state}, idAppointment) {
            return AppointmentsService.deleteAppointment(idAppointment).then(
                () => {
                    let userId;
                    let conv = state.conversation;
                    if(conv.service.user.idUser === conv.lastMessage.idSender) {
                        userId = conv.lastMessage.idReceiver;
                    }
                    else {
                        userId = conv.lastMessage.idSender;
                    }
                    dispatch('loadAppointmentsForCurrentConversation', userId, {root: true});
                    return Promise.resolve();
                }
            );
        },
        acceptAppointment({dispatch, state}, idAppointment) {
            return AppointmentsService.acceptAppointment(idAppointment).then(
                () => {
                    let userId;
                    let conv = state.conversation;
                    if(conv.service.user.idUser === conv.lastMessage.idSender) {
                        userId = conv.lastMessage.idReceiver;
                    }
                    else {
                        userId = conv.lastMessage.idSender;
                    }
                    dispatch('loadAppointmentsForCurrentConversation', userId, {root: true});
                    return Promise.resolve();
                }
            );
        },
        newAppointment({dispatch, state}, payload) {
            return AppointmentsService.newAppointment(payload.date, payload.startHour, state.conversation.service.idService).then(
                () => {
                    let userId;
                    let conv = state.conversation;
                    if(conv.service.user.idUser === conv.lastMessage.idSender) {
                        userId = conv.lastMessage.idReceiver;
                    }
                    else {
                        userId = conv.lastMessage.idSender;
                    }
                    dispatch('loadAppointmentsForCurrentConversation', userId, {root: true});
                    return Promise.resolve();
                }
            );
        },
        sendNewMessage({state}, text) {
            let idReceiver;
            if(state.conversation.lastToSpeak) {
                idReceiver = state.conversation.lastMessage.idReceiver;
            }
            else {
                idReceiver = state.conversation.lastMessage.idSender;
            }
            return MessagesService.sendNewMessage(text, state.conversation.service.idService, idReceiver);
        }
    },
    getters : {
        conversations: state => {
            return state.conversations;
        },
        totalUnreadMessages: state => {
            return state.totalUnreadMessages;
        },
        currentConversationMessages: state => {
            return state.currentConversationMessages;
        },
        conversation : state => {
            return state.conversation;
        },
        appointmentsForCurrentConversation: state => {
            return state.appointmentsForCurrentConversation;
        }
    }
};
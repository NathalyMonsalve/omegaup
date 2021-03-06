import Vue from 'vue';
import notifications_List from '../components/notification/List.vue';
import { OmegaUp } from '../omegaup';
import T from '../lang';
import API from '../api.js';
import * as UI from '../ui';

OmegaUp.on('ready', function() {
  let notificationsList = new Vue({
    el: '#notifications-list',
    render: function(createElement) {
      return createElement('omegaup-notification-list', {
        props: {
          notifications: this.notifications,
        },
        on: {
          read: function(notifications) {
            API.Notification.readNotifications({
              notifications: notifications.map(
                notification => notification.notification_id,
              ),
            })
              .then(() => API.Notification.myList())
              .then(data => {
                notificationsList.notifications = data.notifications;
              })
              .catch(UI.apiError);
          },
        },
      });
    },
    data: {
      notifications: [],
    },
    components: {
      'omegaup-notification-list': notifications_List,
    },
  });

  API.Notification.myList()
    .then(data => {
      notificationsList.notifications = data.notifications;
    })
    .catch(UI.apiError);
});

import axios from 'axios';

export function trackSlowRequests() {
  axios.post('/api/tracker', {
    duration: 0,
    url: '',
  });
}

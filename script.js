import http from 'k6/http';
import { check, sleep } from 'k6';

const getRandomNum = () => Math.floor(Math.random() * 1000 + 1);

export let options = {
  stages: [
    { duration: '15s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '15s', target: 0 }
  ],
  thresholds: {
    errors: ['rate < 0.1'],
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
  },
};

export default function () {
  let res = http.get(`http://localhost:3003/api/listings/${getRandomNum()}/reviews`, {
    timeout: 180000, // 180 seconds
  });
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
